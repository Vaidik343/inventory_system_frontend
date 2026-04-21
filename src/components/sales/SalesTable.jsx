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
import { useAuth } from "../../context/AuthContext";
import { resolvePermissions } from "../../utils/resolvePermissions";

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
  const { userPermissions } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [localSales, setLocalSales] = useState([]);

  const perms = resolvePermissions(userPermissions);
  const canViewSales = perms.can("sale", "view");

  useEffect(() => {
    if (canViewSales) {
      const fetchSales = async () => {
        const data = await getAllSales();
        setLocalSales(data || []);
      };
      fetchSales();
    }
  }, [getAllSales, canViewSales]);

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

  if (!canViewSales) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          You do not have permission to view sales.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {sales.length > 0 ? (

        <>
          <TableContainer
            component={Paper}
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              elevation: 0
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <TableCell sx={{ fontWeight: 700, py: 2 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700, py: 2 }}>Invoice</TableCell>
                  <TableCell sx={{ fontWeight: 700, py: 2 }}>Products</TableCell>
                  <TableCell sx={{ fontWeight: 700, py: 2 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700, py: 2 }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 700, py: 2 }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, py: 2 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {localSales.map((sale) => {
                  const isCancellable = sale.status === "active";

                  return (
                    <TableRow
                      key={sale._id}
                      hover
                      sx={{
                        '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <TableCell sx={{color:"#312e81 !important"}}>
                        {new Date(sale.soldAt || sale.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell sx={{color:"#312e81 !important"}}>{sale.invoiceNumber || "—"}</TableCell>

                      <TableCell sx={{color:"#312e81 !important"}}>
                        {sale.sales_items?.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            No items
                          </Typography>
                        ) : (
                          <Box >
                            {sale.sales_items.map((item) => (
                              <Typography sx={{color:"#312e81 !important"}} key={item._id} variant="body2">
                                • {item.productId?.name || "Unknown Product"} (
                                {item.quantity} × ₹{item.sell_price})
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </TableCell>

                      <TableCell sx={{color:"#312e81 !important"}}>
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
      ) : (

        <Typography>No Sales found</Typography>
      )}

    </>
  );
};

export default SalesTable;
