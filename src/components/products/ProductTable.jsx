import React, { useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext";
import { useSuppliers } from "../../context/SupplierContext";
import { useAuth } from "../../context/AuthContext";
import { resolvePermissions } from "../../utils/resolvePermissions";

const ProductTable = () => {
  const { products, loading, getAllProducts } = useProduct();
  const { categories, getAllCategories } = useCategory();
  const { suppliers, getAllSuppliers } = useSuppliers();
  const { userPermissions } = useAuth();

  const perms = resolvePermissions(userPermissions);
  const canViewProducts = perms.can("product", "view");

  //Load all data once
  useEffect(() => {
    if (canViewProducts) {
      getAllProducts();
      getAllCategories();
      getAllSuppliers();
    }
  }, [canViewProducts]);

  // 🧠 Create lookup maps (O(1) access)
  const categoryMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat._id] = cat.name;
      return acc;
    }, {});
  }, [categories]);

  const supplierMap = useMemo(() => {
    return suppliers.reduce((acc, sup) => {
      acc[sup._id] = sup.name;
      return acc;
    }, {});
  }, [suppliers]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!canViewProducts) {
    return (
      <Box p={3}>
        <Alert severity="error">
          You do not have permission to view products.
        </Alert>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        overflow: 'hidden',
      }}
    >
      <Table size="small">
        <TableHead
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <TableRow>
            <TableCell sx={{ fontWeight: 700, fontSize: '13px' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '13px' }}>SKU</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '13px' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '13px' }}>Supplier</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '13px' }}>Unit</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, fontSize: '13px' }}>Cost</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, fontSize: '13px' }}>Sell Price</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, fontSize: '13px' }}>Tax (%)</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, fontSize: '13px' }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '13px' }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product._id}
              sx={{
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
              <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{product.sku}</TableCell>

              {/* Category Name */}
              <TableCell>
                {product.categoryId?.map((id) => (
                  <Chip
                    key={id}
                    label={categoryMap[id] || "Unknown"}
                    size="small"
                    sx={{
                      mr: 0.5,
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      color: '#4f46e5', // Primary indigo
                      fontWeight: 600,
                    }}
                  />
                ))}
              </TableCell>

              {/* Supplier Name */}
              <TableCell>
                {product.supplierId?.map((id) => (
                  <Chip
                    key={id}
                    label={supplierMap[id] || "Unknown"}
                    size="small"
                    sx={{
                      mr: 0.5,
                      background: 'rgba(236, 72, 153, 0.1)',
                      border: '1px solid rgba(240, 147, 251, 0.2)',
                      color: '#c026d3', // Pink/Fuchsia
                      fontWeight: 600,
                    }}
                  />
                ))}
              </TableCell>

              <TableCell>{product.unit}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>₹{product.cost}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'success.main' }}>₹{product.sell_price}</TableCell>
              <TableCell align="right">{product.tax_rate}%</TableCell>
              <TableCell align="right">
                <Chip
                  label={product.stock_qty}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    background: product.stock_qty === 0
                      ? '#ef4444'
                      : product.stock_qty < 10
                        ? '#f59e0b'
                        : '#10b981',
                    color: 'white',
                  }}
                />
              </TableCell>

              {/* Status */}
              <TableCell>
                <Chip
                  label={product.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    background: product.isActive
                      ? '#10b981'
                      : '#6b7280',
                    color: 'white',
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
