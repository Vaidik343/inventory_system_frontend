import React from 'react'
import SupplierTable from '../components/supplier/supplierTable'
import SupplierForm from '../components/supplier/SupplierForm'

function Supplier() {
  return (
    <div>
      <SupplierForm />
        <SupplierTable />
    </div>
  )
}

export default Supplier