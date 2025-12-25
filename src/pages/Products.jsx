import React from 'react'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'

const Products = () => {
  return (
    <div>
      <ProductForm />
        <ProductTable />
    </div>
  )
}

export default Products