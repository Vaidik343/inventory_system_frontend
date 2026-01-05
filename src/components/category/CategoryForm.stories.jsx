// src/components/category/CategoryForm.stories.jsx
import React from "react";
import CategoryForm from "./CategoryForm";
import { CategoryContext } from "../../context/CategoryContext";

// ✅ Mock confirm for Storybook if needed
global.confirm = () => true;

// ✅ Mock provider for CategoryContext
const MockProvider = ({ children, value }) => (
  <CategoryContext.Provider value={value}>
    {children}
  </CategoryContext.Provider>
);

// ✅ Template for stories
const Template = (args) => <MockProvider value={args}><CategoryForm /></MockProvider>;

export default {
  title: "Forms/CategoryForm",
  component: CategoryForm,
};

// 1️⃣ Default state
export const Default = Template.bind({});
Default.args = {
  createCategory: async (form) => {
    console.log("createCategory called with:", form);
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  deleteCategory: () => {},
  loading: false,
};

// 2️⃣ Loading state (button disabled)
export const Loading = Template.bind({});
Loading.args = {
  createCategory: async () => {},
  deleteCategory: () => {},
  loading: true,
};

// 3️⃣ Simulate error (optional)
export const ErrorState = Template.bind({});
ErrorState.args = {
  createCategory: async () => {
    return Promise.reject("Failed to create category");
  },
  deleteCategory: () => {},
  loading: false,
};
