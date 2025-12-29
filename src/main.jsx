import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";
import { RoleProvider } from "./context/RoleContext";
import { UsersProvider } from "./context/UserContext";
import { CategoriesProvider } from "./context/CategoryContext";
import { SuppliersProvider } from "./context/SupplierContext";
import { ProductProvider } from "./context/ProductContext";
import { PurchaseProvider } from "./context/PurchaseContext";
import { SalesProvider } from "./context/SalesContext";
import { StockAdjustmentProvider } from "./context/StockAdjustmentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <RoleProvider>
            <UsersProvider>
              <CategoriesProvider>
                <SuppliersProvider>
                  <ProductProvider>
                    <PurchaseProvider>
                      <SalesProvider>
                        <StockAdjustmentProvider>
                          <App />
                        </StockAdjustmentProvider>
                      </SalesProvider>
                    </PurchaseProvider>
                  </ProductProvider>
                </SuppliersProvider>
              </CategoriesProvider>
            </UsersProvider>
          </RoleProvider>
        </SettingsProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
