import React, { useEffect } from "react";
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
} from "@mui/material";
import { usePurchase } from "../../context/PurchaseContext";

const statusColor = (status) => {
  switch (status) {
    case "received":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const PurchaseTable = () => {
  const { purchases, getAllPurchase, loading } = usePurchase();

  useEffect(() => {
    getAllPurchase();
  }, []);

  if (loading) return <Typography>Loading purchases...</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Invoice Date</strong></TableCell>
            <TableCell><strong>Supplier</strong></TableCell>
            <TableCell><strong>Products</strong></TableCell>
            <TableCell><strong>Sub Total</strong></TableCell>
            <TableCell><strong>Tax</strong></TableCell>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase._id} hover>
              <TableCell>
                {new Date(purchase.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {purchase.supplierId?.name || "—"}
              </TableCell>

              <TableCell>
                {purchase.purchase_items.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No items
                  </Typography>
                ) : (
                  <Box>
                    {purchase.purchase_items.map((item) => (
                      <Typography
                        key={item._id}
                        variant="body2"
                      >
                        • {item.productId?.name} ({item.qty} × {item.cost_price})
                      </Typography>
                    ))}
                  </Box>
                )}
              </TableCell>

              <TableCell>₹{purchase.sub_total}</TableCell>
              <TableCell>₹{purchase.tax}</TableCell>
              <TableCell>
                <strong>₹{purchase.total}</strong>
              </TableCell>

              <TableCell>
                <Chip
                  label={purchase.status}
                  color={statusColor(purchase.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseTable;
