import React from "react";
import UserTable from "./UserTable";
import { UsersContext } from "../../context/UserContext";
import { RoleContext } from "../../context/RoleContext";
import { AuthContext } from "../../context/AuthContext";
import { fn } from "@storybook/test";

/* ---------------- Mock Providers ---------------- */

const MockUsersProvider = ({ children, value }) => (
  <UsersContext.Provider value={value}>
    {children}
  </UsersContext.Provider>
);

const MockRoleProvider = ({ children, value }) => (
  <RoleContext.Provider value={value}>
    {children}
  </RoleContext.Provider>
);

const MockAuthProvider = ({ children, value }) => (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);

const Wrapper = ({ usersValue, roleValue, authValue, children }) => (
  <MockAuthProvider value={authValue}>
    <MockUsersProvider value={usersValue}>
      <MockRoleProvider value={roleValue}>
        {children}
      </MockRoleProvider>
    </MockUsersProvider>
  </MockAuthProvider>
);

/* ---------------- Template ---------------- */

const Template = (args) => (
  <Wrapper
    usersValue={args.users}
    roleValue={args.roles}
    authValue={args.auth}
  >
    <UserTable />
  </Wrapper>
);

export default {
  title: "Users/UserTable",
  component: UserTable,
};

/* ---------------- Mock Data ---------------- */

const mockUsers = [
  {
    _id: "1",
    email: "admin@example.com",
    role: { _id: "r1", name: "Admin" },
    isActive: true,
    last_login: new Date().toISOString(),
  },
  {
    _id: "2",
    email: "staff@example.com",
    role: { _id: "r2", name: "Staff" },
    isActive: false,
    last_login: null,
  },
];

const mockRoles = [
  { _id: "r1", name: "Admin" },
  { _id: "r2", name: "Staff" },
];

/* ---------------- Stories ---------------- */

// ✅ Normal table
export const Default = Template.bind({});
Default.args = {
  users: {
    users: mockUsers,
    loading: false,
    getAllUsers: fn(),
    updateUser: fn(),
    deactivateUser: fn(),
  },
  roles: {
    roles: mockRoles,
    getAllRoles: fn(),
  },
  auth: {
    userPermissions: [
      { resource: "user", action: "view" },
      { resource: "user", action: "edit" },
    ],
  },
};

// ⏳ Loading state
export const Loading = Template.bind({});
Loading.args = {
  users: {
    users: [],
    loading: true,
    getAllUsers: fn(),
    updateUser: fn(),
    deactivateUser: fn(),
  },
  roles: {
    roles: [],
    getAllRoles: fn(),
  },
  auth: {
    userPermissions: [{ resource: "user", action: "view" }],
  },
};

// ❌ No permission
export const NoPermission = Template.bind({});
NoPermission.args = {
  users: {
    users: [],
    loading: false,
    getAllUsers: fn(),
    updateUser: fn(),
    deactivateUser: fn(),
  },
  roles: {
    roles: mockRoles,
    getAllRoles: fn(),
  },
  auth: {
    userPermissions: [], // cannot view users
  },
};
