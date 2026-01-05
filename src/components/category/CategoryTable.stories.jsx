// src/components/category/CategoryTable.stories.jsx
import React from "react";
import CategoryTable from "./CategoriesTable";
import { CategoryContext } from "../../context/CategoryContext";

// ✅ Mock confirm to prevent Storybook from blocking on delete
global.confirm = () => true;

// ✅ Mock provider to supply CategoryContext for Storybook
const MockProvider = ({ children, value }) => (
  <CategoryContext.Provider value={value}>
    {children}
  </CategoryContext.Provider>
);

// ✅ Template for stories
const Template = (args) => <MockProvider value={args}><CategoryTable /></MockProvider>;

export default {
  title: "Tables/CategoryTable",
  component: CategoryTable,
};

// ------------------ Stories ------------------

// 1️⃣ Loading state
export const Loading = Template.bind({});
Loading.args = {
  categories: [],
  loading: true,
  updateCategory: () => {},
  deleteCategory: () => {},
};

// 2️⃣ Empty state
export const Empty = Template.bind({});
Empty.args = {
  categories: [],
  loading: false,
  updateCategory: () => {},
  deleteCategory: () => {},
};

// 3️⃣ With data
export const WithData = Template.bind({});
WithData.args = {
  categories: [
    { _id: "1", name: "Electronics", isActive: true },
    { _id: "2", name: "Clothing", isActive: false },
  ],
  loading: false,
  updateCategory: () => {},
  deleteCategory: () => {},
};

// 4️⃣ Edit dialog open (simulate click on first edit button)
export const EditDialogOpen = Template.bind({});
EditDialogOpen.args = WithData.args;
EditDialogOpen.play = async ({ canvasElement }) => {
  // Find the first edit button in the table and click it
  const editButton = canvasElement.querySelector("button");
  if (editButton) editButton.click();
};
