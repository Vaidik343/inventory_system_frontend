// src/components/product/ProductCreate.stories.jsx
import React from "react";
import ProductCreate from "./ProductForm";
import { ProductContext } from "../../context/ProductContext";

// ✅ Mock ProductContext Provider
const MockProductProvider = ({ children }) => {
  const createProduct = async (product) => {
    console.log("📦 Product created (storybook mock):", product);

    // simulate API delay
    return new Promise((resolve) =>
      setTimeout(() => resolve(product), 800)
    );
  };

  return (
    <ProductContext.Provider value={{ createProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default {
  title: "Product/ProductCreate",
  component: ProductCreate,
  decorators: [
    (Story) => (
      <MockProductProvider>
        <Story />
      </MockProductProvider>
    ),
  ],
};

// -------------------- Stories --------------------

export const Default = {};
