import React from 'react'
import CategoriesTable from "../components/category/CategoriesTable";
import CategoryForm from '../components/category/categoryForm';
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import CategoryIcon from '@mui/icons-material/Category';

const Categories = () => {
  return (
    <Box>
      <PageHeader
        icon={CategoryIcon}
        title="Categories Management"
        subtitle="Organize your products into categories for better inventory management"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <CategoryForm />
      </Box>

      <CategoriesTable />
    </Box>
  )
}

export default Categories