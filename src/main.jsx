import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import AuthProvider from './context/AuthContext.jsx';
// import CategoryProvider from './context/CategoryContext.jsx';
// import ProductProvider from './context/ProductContext.jsx';
// import PurchaseProvider from './context/PurchaseContext.jsx';
// import RoleProvider from './context/RoleContext.jsx';
// import SalesProvider from './context/SalesContext.jsx';
// import SettingsProvider from './context/SettingsContext.jsx';
// import StockAjustmentProvider from './context/StockAdjustmentContext.jsx';
// import SupplierContext from './context/SupplierContext.jsx';
// import UsersProvider  from './context/UserContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthProvider>
      <CategoryProvider>
        <ProductContext>
          <PurchaseContext>
            <RoleProvider>
              <SalesProvider>
                <SettingsProvider>
                  <StockAjustmentProvider>
                    <SupplierContext>
                      <UsersProvider> */}
                         <App />
                      {/* </UsersProvider>
                    </SupplierContext>
                  </StockAjustmentProvider>
                </SettingsProvider>
              </SalesProvider>
            </RoleProvider>
          </PurchaseContext>
        </ProductContext>
      </CategoryProvider>
    </AuthProvider>
    */}
  </StrictMode>,
)
