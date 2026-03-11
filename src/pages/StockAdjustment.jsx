import React from 'react'
import StockAdjustmentForm from '../components/StockAdjustment/StockAdjustmentForm'
import StockAdjustmentTable from '../components/StockAdjustment/StockAdjustmentTable'
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import TuneIcon from '@mui/icons-material/Tune';

const StockAdjustment = () => {
  return (
    <Box>
      <PageHeader
        icon={TuneIcon}
        title="Stock Adjustments"
        subtitle="Adjust inventory levels and track stock changes"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <StockAdjustmentForm />
      </Box>

      <StockAdjustmentTable />
    </Box>
  )
}

export default StockAdjustment