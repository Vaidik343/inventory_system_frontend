import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useStockAdjustment } from "../../context/StockAdjustmentContext";
import { useProduct } from "../../context/ProductContext";
import { useUsers } from "../../context/UserContext";

const StockTable = () => {
  const { stk, getAllAdjustments, loading } = useStockAdjustment();
  const { products, getAllProducts } = useProduct();
  const { users, getAllUsers } = useUsers();

  useEffect(() => {
    getAllAdjustments();
    getAllProducts();
    getAllUsers();
  }, []);

  const getProductName = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? product.name : "Unknown product";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name || user.email : "Unknown user";
  };

  if (loading) return <CircularProgress />;

  if (!stk.length) {
    return (
      <Typography variant="body2" sx={{ p: 2 }}>
        No stock adjustments found
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Product</strong></TableCell>
            <TableCell><strong>Change</strong></TableCell>
            <TableCell><strong>Reason</strong></TableCell>
            <TableCell><strong>Reference</strong></TableCell>
            <TableCell><strong>Changed By</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {stk.map((adj) => (
            <TableRow key={adj._id} hover>
              <TableCell>{getProductName(adj.productId)}</TableCell>
              <TableCell>{adj.changes}</TableCell>
              <TableCell>{adj.reason}</TableCell>
              <TableCell>{adj.referenceId || "-"}</TableCell>
              <TableCell>{getUserName(adj.changedBy)}</TableCell>
              <TableCell>
                {new Date(adj.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
