import React from "react";
import SupplierForm from "./SupplierForm";
import SupplierTable from "./SupplierTable";
import { SupplierContext } from "../../context/SupplierContext";
import { AuthContext } from "../../context/AuthContext";

/* ---------- Mock Providers ---------- */

const MockSupplierProvider = ({ children, value }) => (
  <SupplierContext.Provider value={value}>
    {children}
  </SupplierContext.Provider>
);

const MockAuthProvider = ({ children, value }) => (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);

/* ---------- Page ---------- */

const SupplierManagementPage = () => (
  <>
    <SupplierForm />
    <SupplierTable />
  </>
);

/* ---------- Template ---------- */

const Template = (args) => (
  <MockAuthProvider value={{ userPermissions: args.userPermissions }}>
    <MockSupplierProvider value={args}>
      <SupplierManagementPage />
    </MockSupplierProvider>
  </MockAuthProvider>
);

export default {
  title: "Suppliers/SupplierManagement",
};

/* ---------- Stories ---------- */

export const Default = Template.bind({});
Default.args = {
  loading: false,
  createSupplier: async () => {},
  getAllSuppliers: () => {},
  suppliers: [
    {
      _id: "1",
      name: "ABC Traders",
      contact_person: "John Doe",
      email: "abc@example.com",
      phone: "9876543210",
      payment_term: "30 Days",
      note: "Reliable",
      address: {
        street: "MG Road",
        city: "Mumbai",
        country: "India",
        pin_code: "400001",
      },
    },
  ],
  userPermissions: ["supplier:view"],
};

// 🚫 No permission
export const NoPermission = Template.bind({});
NoPermission.args = {
  loading: false,
  suppliers: [],
  createSupplier: async () => {},
  getAllSuppliers: () => {},
  userPermissions: [],
};
