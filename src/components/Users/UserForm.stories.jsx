import React from "react";
import UserForm from "./UserForm";
import { UsersContext } from "../../context/UserContext";
import { RoleContext } from "../../context/RoleContext";
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

const Wrapper = ({ usersValue, roleValue, children }) => (
  <MockUsersProvider value={usersValue}>
    <MockRoleProvider value={roleValue}>
      {children}
    </MockRoleProvider>
  </MockUsersProvider>
);

/* ---------------- Story Template ---------------- */

const Template = (args) => (
  <Wrapper usersValue={args.users} roleValue={args.roles}>
    <UserForm />
  </Wrapper>
);

export default {
  title: "Users/UserForm",
  component: UserForm,
};

/* ---------------- Stories ---------------- */

// Default (normal state)
export const Default = Template.bind({});
Default.args = {
  users: {
    createUser: fn(),
    loading: false,
  },
  roles: {
    roles: [
      { _id: "1", name: "Admin" },
      { _id: "2", name: "Manager" },
      { _id: "3", name: "Staff" },
    ],
    getAllRoles: fn(),
  },
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  users: {
    createUser: fn(),
    loading: true,
  },
  roles: {
    roles: [],
    getAllRoles: fn(),
  },
};
