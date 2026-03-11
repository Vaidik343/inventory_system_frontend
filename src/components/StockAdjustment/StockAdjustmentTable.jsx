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
          <TableRow
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Product</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Change</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Reason</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Reference</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Changed By</TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2 }}>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {stk.map((adj) => (
            <TableRow
              key={adj._id}
              hover
              sx={{
                '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                transition: 'all 0.3s ease'
              }}
            >
              <TableCell>{getProductName(adj.productId)}</TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color:
                      adj.changes > 0
                        ? "success.main"
                        : adj.changes < 0
                          ? "error.main"
                          : "text.primary",
                  }}
                >
                  {adj.changes > 0 ? `+${adj.changes}` : adj.changes}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {adj.reason}
                </Typography>
              </TableCell>

              <TableCell>
                {adj.referenceId || "—"}
              </TableCell>

              <TableCell>
                {getUserName(adj.changedBy)}
              </TableCell>

              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(adj.createdAt).toLocaleString()}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

export default StockTable;
