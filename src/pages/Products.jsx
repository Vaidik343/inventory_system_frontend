import React from 'react'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'
import { Box } from '@mui/material'

const Products = () => {
  return (
    <div>
 <Box display="flex" justifyContent="flex-end" mb={2}>
  <ProductForm />
</Box>


        <ProductTable />
    </div>
  )
}

export default Products 