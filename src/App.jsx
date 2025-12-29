import { Routes, Route } from "react-router-dom";

/* Layout */
import Drawer from "./components/Drawer";

/* Pages */
import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Supplier from "./pages/Supplier";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";
import StockAdjustment from "./pages/StockAdjustment";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Login from './components/Login'
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Routes>
      {/* Layout Route (Drawer always visible) */}
       <Route path="/login" element={<Login />} />
      <Route element={<Drawer />}>
       {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/stock" element={<StockAdjustment />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/user" element={<User />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
