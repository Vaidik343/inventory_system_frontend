import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, Avatar, LinearProgress, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupplierSummaryCard from './supplier/SupplierSummaryCard';
import ProductSummaryCard from './products/ProductSummaryCard';

// Styled Components with Glassmorphism
const GlassCard = styled(Card)(({ theme, gradient }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.25)',
  },
}));

const StatCard = styled(Card)(({ theme, bgGradient }) => ({
  background: bgGradient || 'rgba(255, 255, 255, 0.15)',
  color: 'white',
  borderRadius: '16px',
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    transform: 'translate(30%, -30%)',
  }
}));

const IconWrapper = styled(Avatar)(({ bgcolor }) => ({
  background: bgcolor || 'rgba(255,255,255,0.2)',
  width: 56,
  height: 56,
  marginBottom: '12px',
  backdropFilter: 'blur(10px)',
}));

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '2,547',
      change: '+12.5%',
      trend: 'up',
      icon: <InventoryIcon sx={{ fontSize: 28 }} />,
      gradient: '#6366f1',
      bgColor: 'rgba(255,255,255,0.2)'
    },
    {
      title: 'Total Sales',
      value: '$45,890',
      change: '+8.2%',
      trend: 'up',
      icon: <AttachMoneyIcon sx={{ fontSize: 28 }} />,
      gradient: '#ec4899',
      bgColor: 'rgba(255,255,255,0.2)'
    },
    {
      title: 'Orders',
      value: '1,235',
      change: '-3.5%',
      trend: 'down',
      icon: <ShoppingCartIcon sx={{ fontSize: 28 }} />,
      gradient: '#3b82f6',
      bgColor: 'rgba(255,255,255,0.2)'
    },
    {
      title: 'Suppliers',
      value: '145',
      change: '+5.7%',
      trend: 'up',
      icon: <LocalShippingIcon sx={{ fontSize: 28 }} />,
      gradient: '#f59e0b',
      bgColor: 'rgba(255,255,255,0.2)'
    }
  ];

  const recentActivities = [
    { action: 'New product added', product: 'MacBook Pro 16"', time: '5 min ago', type: 'product' },
    { action: 'Order completed', product: 'Order #4521', time: '15 min ago', type: 'order' },
    { action: 'Low stock alert', product: 'iPhone 15 Pro', time: '1 hour ago', type: 'alert' },
    { action: 'Supplier updated', product: 'Tech Supplies Inc.', time: '2 hours ago', type: 'supplier' },
  ];

  const inventoryStatus = [
    { category: 'Electronics', stock: 75, color: '#667eea' },
    { category: 'Clothing', stock: 45, color: '#f093fb' },
    { category: 'Food & Beverage', stock: 90, color: '#4facfe' },
    { category: 'Home & Garden', stock: 60, color: '#fa709a' },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            mb: 1
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Welcome back! Here's what's happening with your inventory today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard bgGradient={stat.gradient} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent sx={{ p: 0 }}>
                <IconWrapper bgcolor={stat.bgColor}>
                  {stat.icon}
                </IconWrapper>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  {stat.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.trend === 'up' ? (
                    <TrendingUpIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 18 }} />
                  )}
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {stat.change} from last month
                  </Typography>
                </Box>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Product and Supplier Summary */}
            <ProductSummaryCard />
            <SupplierSummaryCard />

            {/* Recent Activities */}
            <GlassCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <AssessmentIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Recent Activities
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentActivities.map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(99, 102, 241, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(99, 102, 241, 0.1)',
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {activity.action}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {activity.product}
                        </Typography>
                      </Box>
                      <Chip
                        label={activity.time}
                        size="small"
                        sx={{
                          background: 'rgba(99, 102, 241, 0.1)',
                          color: 'primary.main',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </GlassCard>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Inventory Status */}
            <GlassCard>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Inventory Status
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {inventoryStatus.map((item, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.category}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: item.color }}>
                          {item.stock}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.stock}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            background: item.color,
                            borderRadius: 4,
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Quick Actions
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { label: 'Add New Product', icon: '📦' },
                    { label: 'Create Purchase Order', icon: '🛒' },
                    { label: 'Generate Report', icon: '📊' },
                    { label: 'Manage Suppliers', icon: '🚚' },
                  ].map((action, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      <Typography variant="h5">{action.icon}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {action.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </GlassCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;