import React from 'react'
import SalesForm from '../components/sales/SalesForm'
import SalesTable from '../components/sales/SalesTable'
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Sales = () => {
  return (
    <Box>
      <PageHeader
        icon={PointOfSaleIcon}
        title="Sales Management"
        subtitle="Track and manage your sales transactions"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <SalesForm />
      </Box>

      <SalesTable />
    </Box>
  )
}

export default Sales