import React, { useEffect, useMemo } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import PageHeader from "../components/PageHeader";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";
import { useSales } from "../context/SalesContext";
import { usePurchase } from "../context/PurchaseContext";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];

const Analytics = () => {
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

  // Category Distribution Data
  const categoryData = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const catId = p.categoryId?.[0];
      const catName = categories.find((c) => c._id === catId)?.name || "Uncategorized";
      counts[catName] = (counts[catName] || 0) + 1;
    });

    return Object.keys(counts).map((name) => ({
      name,
      value: counts[name],
    }));
  }, [products, categories]);

  // Sales vs Purchases Data (Last 30 days)
  const comparisonData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    return last30Days.map((date) => {
      const daySales = sales
        .filter((s) => s.createdAt?.split("T")[0] === date)
        .reduce((acc, s) => acc + (s.grandTotal || 0), 0);
      
      const dayPurchases = purchases
        .filter((p) => p.createdAt?.split("T")[0] === date)
        .reduce((acc, p) => acc + (p.grandTotal || 0), 0);

      return {
        date: date.slice(5),
        sales: daySales,
        purchases: dayPurchases,
      };
    }).filter(d => d.sales > 0 || d.purchases > 0); // Only show days with activity
  }, [sales, purchases]);

  // Stock Value by Category
  const stockValueData = useMemo(() => {
    const values = {};
    products.forEach((p) => {
      const catId = p.categoryId?.[0];
      const catName = categories.find((c) => c._id === catId)?.name || "Uncategorized";
      const val = (p.stock_qty || 0) * (p.cost || 0);
      values[catName] = (values[catName] || 0) + val;
    });

    return Object.keys(values).map((name) => ({
      name,
      value: Math.round(values[name]),
    })).sort((a, b) => b.value - a.value);
  }, [products, categories]);

  return (
    <Box>
      <PageHeader
        title="Analytics & Insights"
        subtitle="Deep dive into your inventory performance and financial trends."
        icon={BarChartIcon}
      />

      <Grid container spacing={3}>
        {/* Sales vs Purchases */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              height: "450px",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Revenue vs. Expenditure (Last 30 Days)
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="sales" name="Sales Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchases" name="Purchase Cost" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              height: "450px",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Product Distribution by Category
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Stock Value by Category */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              height: "450px",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Stock Value by Category (₹)
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart layout="vertical" data={stockValueData} margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis type="number" axisLine={false} tickLine={false} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                <Tooltip
                  formatter={(value) => `₹${value.toLocaleString()}`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
