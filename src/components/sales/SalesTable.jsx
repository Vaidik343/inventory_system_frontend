import React, { useEffect, useState, forwardRef } from "react";
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
  CircularProgress
} from "@mui/material";
import { List } from "react-window";
import { AutoSizer } from "react-virtualized-auto-sizer";
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

  const Row = ({ index, style }) => {
    const sale = localSales[index];
    if (!sale) return null;
    const isCancellable = sale.status === "active";

    return (
      <TableRow
        key={sale._id}
        component="div"
        sx={{
          display: 'flex',
          width: '100%',
          ...style,
          '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <TableCell sx={{ flex: 1, color: "#312e81 !important", display: 'flex', alignItems: 'center' }}>
          {new Date(sale.soldAt || sale.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell sx={{ flex: 1, color: "#312e81 !important", display: 'flex', alignItems: 'center' }}>
          {sale.invoiceNumber || "—"}
        </TableCell>
        <TableCell sx={{ flex: 2, color: "#312e81 !important", overflow: 'hidden' }}>
          {sale.sales_items?.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No items</Typography>
          ) : (
            <Box sx={{ maxHeight: '100%', overflow: 'auto', py: 1 }}>
              {sale.sales_items.map((item) => (
                <Typography sx={{ color: "#312e81 !important", fontSize: '0.75rem' }} key={item._id} variant="body2" noWrap>
                  • {item.productId?.name || "Unknown"} ({item.quantity} × ₹{item.sell_price})
                </Typography>
              ))}
            </Box>
          )}
        </TableCell>
        <TableCell sx={{ flex: 1, color: "#312e81 !important", display: 'flex', alignItems: 'center' }}>
          <strong>₹{sale.total || 0}</strong>
        </TableCell>
        <TableCell sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Chip label={sale.payment_status || "pending"} color={paymentColor(sale.payment_status)} size="small" />
        </TableCell>
        <TableCell sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Chip label={sale.status} color={statusColor(sale.status)} size="small" />
        </TableCell>
        <TableCell align="center" sx={{ flex: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton
            color="error"
            onClick={() => handleCancelClick(sale)}
            disabled={!isCancellable}
            size="small"
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  if (loading) return <Box p={3} textAlign="center"><CircularProgress /></Box>;

  if (!canViewSales) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">You do not have permission to view sales.</Typography>
      </Box>
    );
  }

  return (
    <>
      {localSales.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            height: 'calc(100vh - 250px)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Table size="small" component="div">
            <TableHead component="div" sx={{ display: 'block', width: '100%' }}>
              <TableRow component="div" sx={{ background: 'rgba(255, 255, 255, 0.05)', display: 'flex', width: '100%' }}>
                <TableCell sx={{ flex: 1, fontWeight: 700, py: 2 }}>Date</TableCell>
                <TableCell sx={{ flex: 1, fontWeight: 700, py: 2 }}>Invoice</TableCell>
                <TableCell sx={{ flex: 2, fontWeight: 700, py: 2 }}>Products</TableCell>
                <TableCell sx={{ flex: 1, fontWeight: 700, py: 2 }}>Total</TableCell>
                <TableCell sx={{ flex: 1, fontWeight: 700, py: 2 }}>Payment</TableCell>
                <TableCell sx={{ flex: 1, fontWeight: 700, py: 2 }}>Status</TableCell>
                <TableCell align="center" sx={{ flex: 0.8, fontWeight: 700, py: 2 }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <Box sx={{ flexGrow: 1, height: '100%' }}>
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    rowCount={localSales.length}
                    rowHeight={100}
                    width={width}
                    tagName={TableBody}
                  >
                    {Row}
                  </List>
                )}
              </AutoSizer>
            </Box>
          </Table>
        </TableContainer>
      ) : (
        <Box p={3} textAlign="center"><Typography>No Sales found</Typography></Box>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Cancel Sale</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this sale?<br />
            <strong>Invoice: {selectedSale?.invoiceNumber}</strong><br />
            This action will restore stock and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No, Keep Sale</Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">Yes, Cancel Sale</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SalesTable;
