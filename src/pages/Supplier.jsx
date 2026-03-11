import React from 'react'
import SupplierTable from '../components/supplier/supplierTable'
import SupplierForm from '../components/supplier/SupplierForm'
import { Box } from '@mui/material';
import PageHeader from '../components/PageHeader';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Supplier() {
  return (
    <Box>
      <PageHeader
        icon={LocalShippingIcon}
        title="Suppliers Management"
        subtitle="Manage your supplier relationships and contact information"
      />

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <SupplierForm />
      </Box>

      <SupplierTable />
    </Box>
  )
}

export default Supplier 