// src/components/product/ProductTable.stories.jsx
import React from "react";
import ProductTable from "./ProductTable";

import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import { SupplierContext } from "../../context/SupplierContext";
import { AuthContext } from "../../context/AuthContext";

/* ---------------- MOCK DATA ---------------- */

const mockProducts = [
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
    stock_qty: 12,
    isActive: true,
  },
  {
    _id: "2",
    name: "MacBook Air",
    sku: "MBA-M2",
    categoryId: ["c2"],
    supplierId: ["s2"],
    unit: "pcs",
    cost: 90000,
    sell_price: 110000,
    tax_rate: 18,
    stock_qty: 5,
    isActive: false,
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

/* ---------------- MOCK PROVIDERS ---------------- */

const MockProviders = ({ children, loading = false, canView = true }) => (
  <AuthContext.Provider
    value={{
      userPermissions: canView
        ? ["product:view"]
        : [],
    }}
  >
    <ProductContext.Provider
      value={{
        products: mockProducts,
        loading,
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

/* ---------------- STORY CONFIG ---------------- */

export default {
  title: "Product/ProductTable",
  component: ProductTable,
  decorators: [
    (Story) => (
      <MockProviders>
        <Story />
      </MockProviders>
    ),
  ],
};

/* ---------------- STORIES ---------------- */

export const Default = {};

export const Loading = {
  decorators: [
    (Story) => (
      <MockProviders loading={true}>
        <Story />
      </MockProviders>
    ),
  ],
};

export const NoPermission = {
  decorators: [
    (Story) => (
      <MockProviders canView={false}>
        <Story />
      </MockProviders>
    ),
  ],
};
