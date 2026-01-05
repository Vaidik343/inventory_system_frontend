import React from 'react'
import SupplierSummaryCard from '../components/supplier/SupplierSummaryCard';
import ProductSummaryCard from '../components/products/ProductSummaryCard'
import { Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Box display='flex' flex-direction='column' flexWrap='wrap' gap={2}>

              <ProductSummaryCard />
        <SupplierSummaryCard />
    </Box>
  )
}

export default Dashboard 