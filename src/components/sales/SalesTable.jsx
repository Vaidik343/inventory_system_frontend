import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSales } from "../../context/SalesContext";

const statusColor = (status) => {
  switch (status) {
    case "active":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const paymentColor = (status) => {
  switch (status) {
    case "paid":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    case "refunded":
      return "info";
    default:
      return "default";
  }
};

const SalesTable = () => {
  const { sales, getAllSales, cancelSale, loading } = useSales();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [localSales, setLocalSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getAllSales();
      setLocalSales(data || []);
    };
    fetchSales();
  }, [getAllSales]);

  const handleCancelClick = (sale) => {
    setSelectedSale(sale);
    setConfirmOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedSale) return;

    try {
      const updatedSale = await cancelSale(selectedSale._id);
      // Update local state instead of full refresh
      setLocalSales((prev) =>
        prev.map((s) => (s._id === updatedSale.sale._id ? updatedSale.sale : s))
      );
    } catch (err) {
      console.error("Cancel failed:", err);
    } finally {
      setConfirmOpen(false);
      setSelectedSale(null);
    }
  };

  if (loading) return <Typography>Loading sales...</Typography>;

  return (
   <>
   {sales.length > 0 ? (

     <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Invoice</strong></TableCell>
              <TableCell><strong>Products</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {localSales.map((sale) => {
              const isCancellable = sale.status === "active";

              return (
                <TableRow key={sale._id} hover>
                  <TableCell>
                    {new Date(sale.soldAt || sale.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{sale.invoiceNumber || "—"}</TableCell>

                  <TableCell>
                    {sale.sales_items?.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No items
                      </Typography>
                    ) : (
                      <Box>
                        {sale.sales_items.map((item) => (
                          <Typography key={item._id} variant="body2">
                            • {item.productId?.name || "Unknown Product"} (
                            {item.quantity} × ₹{item.sell_price})
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </TableCell>

                  <TableCell>
                    <strong>₹{sale.total || 0}</strong>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={sale.payment_status || "pending"}
                      color={paymentColor(sale.payment_status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={sale.status}
                      color={statusColor(sale.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleCancelClick(sale)}
                      disabled={!isCancellable}
                      title={
                        isCancellable
                          ? "Cancel Sale"
                          : "Only active sales can be cancelled"
                      }
                    >
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Cancel Sale</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this sale?
            <br />
            <strong>Invoice: {selectedSale?.invoiceNumber}</strong>
            <br />
            This action will restore stock and cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No, Keep Sale</Button>
          <Button
            onClick={handleConfirmCancel}
            color="error"
            variant="contained"
          >
            Yes, Cancel Sale
          </Button>
        </DialogActions>
      </Dialog>
    </>
   ): (

    <Typography>No Sales found</Typography>
   )}
   
   </>
  );
};

export default SalesTable;
