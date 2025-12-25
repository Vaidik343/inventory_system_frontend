import React from 'react'
import PurchaseTable from "../components/Purchases/PurchasesTable";
import PurchaseForm from '../components/Purchases/PurchaseForm';


const Purchase = () => {
  return (
    <div>
        <PurchaseForm />
        <PurchaseTable />
    </div>
  )
}

export default Purchase