import React from "react";
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

/* ---------- Template ---------- */

const Template = (args) => (
  <MockAuthProvider value={{ userPermissions: args.userPermissions }}>
    <MockSupplierProvider value={args}>
      <SupplierTable />
    </MockSupplierProvider>
  </MockAuthProvider>
);

export default {
  title: "Suppliers/SupplierTable",
  component: SupplierTable,
};

/* ---------- Stories ---------- */

// ✅ With suppliers
export const WithData = Template.bind({});
WithData.args = {
  loading: false,
  getAllSuppliers: () => {},
  suppliers: [
    {
      _id: "1",
      name: "ABC Traders",
      contact_person: "John Doe",
      email: "abc@example.com",
      phone: "9876543210",
      payment_term: "30 Days",
      note: "Preferred supplier",
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

// ⏳ Loading state
export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  suppliers: [],
  getAllSuppliers: () => {},
  userPermissions: ["supplier:view"],
};

// 🚫 No permission
export const NoPermission = Template.bind({});
NoPermission.args = {
  loading: false,
  suppliers: [],
  getAllSuppliers: () => {},
  userPermissions: [],
};
