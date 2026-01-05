// src/components/product/ProductManagement.stories.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";

import ProductCreate from "./ProductForm";
import ProductTable from "./ProductTable";

import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import { SupplierContext } from "../../context/SupplierContext";
import { AuthContext } from "../../context/AuthContext";

/* ---------------- MOCK DATA ---------------- */

const initialProducts = [
  {
    _id: "1",
    name: "iPhone 15",
    sku: "IP15",
    categoryId: ["c1"],
    supplierId: ["s1"],
    unit: "pcs",
    cost: 60000,
    sell_price: 75000,
    tax_rate: 18,
    stock_qty: 10,
    isActive: true,
  },
];

const mockCategories = [
  { _id: "c1", name: "Mobile" },
  { _id: "c2", name: "Laptop" },
];

const mockSuppliers = [
  { _id: "s1", name: "Apple India" },
  { _id: "s2", name: "Apple Distributor" },
];

/* ---------------- MOCK PROVIDER ---------------- */

const ProductManagementProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  const createProduct = async (product) => {
    setLoading(true);

    setProducts((prev) => [
      ...prev,
      {
        ...product,
        _id: Date.now().toString(),
        tax_rate: 18,
        unit: "pcs",
        isActive: true,
      },
    ]);

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userPermissions: ["product:view", "product:create"],
      }}
    >
      <ProductContext.Provider
        value={{
          products,
          loading,
          createProduct,
          getAllProducts: () => {},
        }}
      >
        <CategoryContext.Provider
          value={{
            categories: mockCategories,
            getAllCategories: () => {},
          }}
        >
          <SupplierContext.Provider
            value={{
              suppliers: mockSuppliers,
              getAllSuppliers: () => {},
            }}
          >
            {children}
          </SupplierContext.Provider>
        </CategoryContext.Provider>
      </ProductContext.Provider>
    </AuthContext.Provider>
  );
};

/* ---------------- STORY ---------------- */

export default {
  title: "Management/Product Management",
  decorators: [
    (Story) => (
      <ProductManagementProvider>
        <Story />
      </ProductManagementProvider>
    ),
  ],
};

export const Default = () => (
  <Box>
    <ProductCreate />
    <ProductTable />
  </Box>
);
