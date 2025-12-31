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
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Sell Price</TableCell>
            <TableCell align="right">Tax (%)</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>

              {/* Category Name */}
              <TableCell>
                {product.categoryId?.map((id) => (
                  <Chip
                    key={id}
                    label={categoryMap[id] || "Unknown"}
                    size="small"
                    sx={{ mr: 0.5 }}
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
                    sx={{ mr: 0.5 }}
                  />
                ))}
              </TableCell>

              <TableCell>{product.unit}</TableCell>
              <TableCell align="right">₹{product.cost}</TableCell>
              <TableCell align="right">₹{product.sell_price}</TableCell>
              <TableCell align="right">{product.tax_rate}%</TableCell>
              <TableCell align="right">{product.stock_qty}</TableCell>

              {/* Status */}
              <TableCell>
                <Chip
                  label={product.isActive ? "Active" : "Inactive"}
                  color={product.isActive ? "success" : "default"}
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

export default ProductTable;
