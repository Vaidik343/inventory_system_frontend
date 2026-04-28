import React, { useEffect, useMemo } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  Inventory,
  Category,
  ShoppingCart,
  Warning,
  AttachMoney,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import PageHeader from "../components/PageHeader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";
import { useSales } from "../context/SalesContext";
import { usePurchase } from "../context/PurchaseContext";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <Card
    sx={{
      height: "100%",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "24px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
            p: 1.5,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ color: color, fontSize: 28 }} />
        </Box>
        {trend && (
          <Box
            sx={{
              background: trend > 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              px: 1,
              py: 0.5,
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: trend > 0 ? "#10b981" : "#ef4444", fontWeight: 700 }}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </Typography>
          </Box>
        )}
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5, color: "#1e1b4b" }}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { products, getAllProducts } = useProduct();
  const { categories, getAllCategories } = useCategory();
  const { sales, getAllSales } = useSales();
  const { purchases, getAllPurchase } = usePurchase();

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllSales();
    getAllPurchase();
  }, []);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const totalSales = sales.reduce((acc, sale) => acc + (sale.grandTotal || 0), 0);
    const lowStockItems = products.filter((p) => p.stock_qty < 10).length;
    const outOfStock = products.filter((p) => p.stock_qty === 0).length;

    return {
      totalProducts,
      totalCategories,
      totalSales: `₹${totalSales.toLocaleString()}`,
      lowStockItems,
      outOfStock,
    };
  }, [products, categories, sales]);

  // Sample data for charts - in a real app, this would come from an analytics API
  const chartData = useMemo(() => {
    // Group sales by date
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    return last7Days.map((date) => {
      const daySales = sales
        .filter((s) => s.createdAt?.split("T")[0] === date)
        .reduce((acc, s) => acc + (s.grandTotal || 0), 0);
      return { name: date.slice(5), sales: daySales };
    });
  }, [sales]);

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your inventory today."
        icon={DashboardIcon}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Inventory}
            color="#6366f1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={stats.totalSales}
            icon={AttachMoney}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock"
            value={stats.lowStockItems}
            icon={Warning}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value={stats.totalCategories}
            icon={Category}
            color="#ec4899"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              height: "400px",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Sales Overview (Last 7 Days)
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              height: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Recent Stock Alerts
            </Typography>
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              {products
                .filter((p) => p.stock_qty < 10)
                .slice(0, 5)
                .map((product) => (
                  <Box
                    key={product._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                      p: 1.5,
                      borderRadius: "16px",
                      background: "rgba(245, 158, 11, 0.05)",
                      border: "1px solid rgba(245, 158, 11, 0.1)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: product.stock_qty === 0 ? "#ef4444" : "#f59e0b",
                      }}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="body2" fontWeight={700}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        SKU: {product.sku}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={800} color="#1e1b4b">
                      {product.stock_qty} left
                    </Typography>
                  </Box>
                ))}
              {products.filter((p) => p.stock_qty < 10).length === 0 && (
                <Box textAlign="center" py={4}>
                  <Inventory sx={{ fontSize: 48, color: "rgba(0,0,0,0.1)", mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    All stock levels are healthy.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
