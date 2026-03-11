import React from 'react'
import PurchaseTable from "../components/Purchases/PurchasesTable";
import PurchaseForm from '../components/Purchases/PurchaseForm';
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Purchase = () => {
  return (
    <Box>
      <PageHeader
        icon={ShoppingCartIcon}
        title="Purchase Orders"
        subtitle="Manage purchase orders and track incoming inventory"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <PurchaseForm />
      </Box>

      <PurchaseTable />
    </Box>
  )
}

export default Purchase