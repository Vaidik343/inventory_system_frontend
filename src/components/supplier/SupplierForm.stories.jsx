import React from "react";
import SupplierForm from "./SupplierForm";
import { SupplierContext } from "../../context/SupplierContext";
import { fn } from "@storybook/test";

/* ---------------- Mock Provider ---------------- */

const MockSupplierProvider = ({ children, value }) => (
  <SupplierContext.Provider value={value}>
    {children}
  </SupplierContext.Provider>
);

/* ---------------- Template ---------------- */

const Template = (args) => (
  <MockSupplierProvider value={args}>
    <SupplierForm />
  </MockSupplierProvider>
);

export default {
  title: "Suppliers/SupplierForm",
  component: SupplierForm,
};

/* ---------------- Stories ---------------- */

// ✅ Default (dialog closed initially)
export const Default = Template.bind({});
Default.args = {
  createSupplier: fn(),
  loading: false,
};

// ⏳ Loading state
export const Loading = Template.bind({});
Loading.args = {
  createSupplier: fn(),
  loading: true,
};
