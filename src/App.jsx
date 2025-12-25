import { useState } from 'react'
import {ProductProvider} from './context/ProductContext.jsx';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Products from './pages/Products.jsx';
import { CategoriesProvider } from './context/CategoryContext.jsx';
import { SuppliersProvider } from './context/SupplierContext.jsx';
import Categories from './pages/Categories.jsx';
import { PurchaseProvider } from './context/PurchaseContext.jsx';
import Purchase from './pages/Purchase.jsx';
import Supplier from './pages/Supplier.jsx';

 

function App() {


  return (
    <>
    {/* <ProductProvider>
      <CategoriesProvider>
        <SuppliersProvider>
                 <Products />
        </SuppliersProvider>
      </CategoriesProvider>
    </ProductProvider>
    <CategoriesProvider>
      <Categories />
    </CategoriesProvider> */}
{/* <PurchaseProvider>
  <ProductProvider> */}
    <SuppliersProvider>
      {/* <Purchase /> */}
        <Supplier />
    </SuppliersProvider>
  {/* </ProductProvider>
</PurchaseProvider> */}
    </>
  )
}

export default App
