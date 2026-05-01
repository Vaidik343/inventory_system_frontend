import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  Inventory,
  Category,
  Warning,
  AttachMoney,
} from "@mui/icons-material";
import {
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
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";
import toast from "react-hot-toast";

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
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, analyticsRes] = await Promise.all([
          axiosInstance.get(ENDPOINTS.DASHBOARD.STATS),
          axiosInstance.get(ENDPOINTS.DASHBOARD.ANALYTICS),
        ]);
        setStats(statsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // Format chart data
  const chartData = analytics?.salesTrend?.map(item => ({
    name: item._id.split('-').slice(1).join('-'), // "MM-DD"
    sales: item.dailyRevenue
  })) || [];

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
            value={stats?.totalProducts || 0}
            icon={Inventory}
            color="#6366f1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={`₹${(stats?.salesData?.totalRevenue || 0).toLocaleString()}`}
            icon={AttachMoney}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock"
            value={stats?.lowStockProducts?.length || 0}
            icon={Warning}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value={stats?.totalCategories || 0}
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
              {stats?.lowStockProducts?.slice(0, 5).map((product) => (
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
              {(!stats?.lowStockProducts || stats.lowStockProducts.length === 0) && (
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
