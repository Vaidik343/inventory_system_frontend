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
import { SettingsProvider } from './context/SettingsContext.jsx';
import Settings from './pages/Settings.jsx';
import { UsersProvider } from './context/UserContext.jsx';
import User from './pages/User.jsx';
import { RoleProvider } from './context/RoleContext.jsx';
import {SalesProvider} from './context/SalesContext.jsx';
import Sales from './pages/Sales.jsx';
import { StockProvider } from './context/StockAdjustmentContext.jsx';
import StockAdjustment from './pages/StockAdjustment.jsx';


function App() {


  return (
    <>
   

{/* <SettingsProvider>
  <Settings />
</SettingsProvider> */}

{/* <UsersProvider>
  <RoleProvider>
  <User />
  </RoleProvider>
</UsersProvider> */}
{/* 
<SalesProvider>
  <ProductProvider>
  <Sales />
  </ProductProvider>
</SalesProvider> */}

  <StockProvider>
    <ProductProvider>
      <UsersProvider>
    <StockAdjustment />
    </UsersProvider>
    </ProductProvider>
  </StockProvider>

    </>
  )
}

export default App
 