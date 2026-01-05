// src/components/category/CategoryManagement.stories.jsx
import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoriesTable";
import { CategoryContext } from "../../context/CategoryContext";

// ✅ Mock confirm for Storybook
global.confirm = () => true;

// ✅ Wrapper to provide CategoryContext
const MockProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { _id: "1", name: "Electronics", isActive: true },
    { _id: "2", name: "Clothing", isActive: false },
  ]);
  const [loading, setLoading] = useState(false);

  const createCategory = async (form) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCategory = { _id: Date.now().toString(), ...form, isActive: true };
        setCategories((prev) => [...prev, newCategory]);
        setLoading(false);
        resolve(newCategory);
      }, 500);
    });
  };

  const updateCategory = async (id, payload) => {
    setCategories((prev) =>
      prev.map((cat) => (cat._id === id ? { ...cat, ...payload } : cat))
    );
  };

  const deleteCategory = async (id) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  };

  const value = {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

// ✅ Template to render both form + table
const Template = (args) => (
  <MockProvider>
    <CategoryForm />
    <CategoryTable />
  </MockProvider>
);

export default {
  title: "Category/Management",
  component: CategoryTable,
};

// ----------------- Stories -----------------

export const Default = Template.bind({});
Default.args = {};
