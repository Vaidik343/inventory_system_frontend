import React from 'react'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'
import { Box } from '@mui/material'
import PageHeader from '../components/PageHeader'
import InventoryIcon from '@mui/icons-material/Inventory'

const Products = () => {
  return (
    <Box>
      <PageHeader
        icon={InventoryIcon}
        title="Products Management"
        subtitle="Manage your product inventory, pricing, and stock levels"
      />

      {/* Action Bar */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <ProductForm />
      </Box>

      {/* Products Table */}
      <ProductTable />
    </Box>
  )
}

export default Products 