import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Tab,
    Tabs,
    Paper,
    Chip,
    Avatar,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import StarIcon from '@mui/icons-material/Star';

const GlassCard = styled(Card)({
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
});

const GradientBox = styled(Box)(({ gradientColor }) => ({
    background: gradientColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '24px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        animation: 'pulse 4s ease-in-out infinite',
    },
}));

const Analytics = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const salesData = [
        { month: 'Jan', revenue: 45000, orders: 234, growth: '+12%' },
        { month: 'Feb', revenue: 52000, orders: 287, growth: '+15%' },
        { month: 'Mar', revenue: 48000, orders: 251, growth: '-8%' },
        { month: 'Apr', revenue: 61000, orders: 312, growth: '+27%' },
        { month: 'May', revenue: 58000, orders: 298, growth: '-5%' },
        { month: 'Jun', revenue: 67000, orders: 345, growth: '+16%' },
    ];

    const topProducts = [
        { name: 'MacBook Pro 16"', sold: 145, revenue: '$289,550', category: 'Electronics' },
        { name: 'iPhone 15 Pro', sold: 234, revenue: '$233,766', category: 'Electronics' },
        { name: 'Nike Air Max', sold: 189, revenue: '$28,350', category: 'Clothing' },
        { name: 'Sony WH-1000XM5', sold: 167, revenue: '$66,800', category: 'Electronics' },
        { name: 'Samsung Galaxy S24', sold: 143, revenue: '$114,400', category: 'Electronics' },
    ];

    const categoryPerformance = [
        { category: 'Electronics', sales: 85, color: '#667eea' },
        { category: 'Clothing', sales: 65, color: '#f093fb' },
        { category: 'Food & Beverage', sales: 92, color: '#4facfe' },
        { category: 'Home & Garden', sales: 78, color: '#fa709a' },
        { category: 'Sports', sales: 54, color: '#feca57' },
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                    }}
                >
                    Analytics & Insights
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Track your business performance and discover trends
                </Typography>
            </Box>

            {/* Tabs */}
            <Paper sx={{ mb: 3, borderRadius: '16px', overflow: 'hidden' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '15px',
                        },
                    }}
                >
                    <Tab icon={<ShowChartIcon />} iconPosition="start" label="Sales Overview" />
                    <Tab icon={<PieChartIcon />} iconPosition="start" label="Category Performance" />
                    <Tab icon={<TimelineIcon />} iconPosition="start" label="Trends" />
                </Tabs>
            </Paper>

            {/* Tab Content */}
            {tabValue === 0 && (
                <Grid container spacing={3}>
                    {/* Revenue Cards */}
                    <Grid item xs={12} md={4}>
                        <GradientBox gradientColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                                Total Revenue
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                $331,000
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon />
                                <Typography variant="body2">+18.2% from last period</Typography>
                            </Box>
                        </GradientBox>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <GradientBox gradientColor="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                                Total Orders
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                1,727
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon />
                                <Typography variant="body2">+12.5% from last period</Typography>
                            </Box>
                        </GradientBox>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <GradientBox gradientColor="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                                Average Order Value
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                $192
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon />
                                <Typography variant="body2">+5.1% from last period</Typography>
                            </Box>
                        </GradientBox>
                    </Grid>

                    {/* Monthly Sales Table */}
                    <Grid item xs={12}>
                        <GlassCard>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Monthly Sales Breakdown
                                </Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 700 }}>Month</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Revenue</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Orders</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Growth</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {salesData.map((row) => (
                                                <TableRow key={row.month} hover>
                                                    <TableCell sx={{ fontWeight: 600 }}>{row.month}</TableCell>
                                                    <TableCell>${row.revenue.toLocaleString()}</TableCell>
                                                    <TableCell>{row.orders}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={row.growth}
                                                            size="small"
                                                            sx={{
                                                                background: row.growth.startsWith('+')
                                                                    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                                                                    : 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </GlassCard>
                    </Grid>
                </Grid>
            )}

            {tabValue === 1 && (
                <Grid container spacing={3}>
                    {/* Top Products */}
                    <Grid item xs={12} lg={8}>
                        <GlassCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <StarIcon sx={{ color: '#feca57' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Top Selling Products
                                    </Typography>
                                </Box>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Units Sold</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>Revenue</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {topProducts.map((product, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
                                                    <TableCell>
                                                        <Chip label={product.category} size="small" />
                                                    </TableCell>
                                                    <TableCell>{product.sold}</TableCell>
                                                    <TableCell sx={{ fontWeight: 700, color: '#667eea' }}>
                                                        {product.revenue}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </GlassCard>
                    </Grid>

                    {/* Category Performance */}
                    <Grid item xs={12} lg={4}>
                        <GlassCard>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Category Performance
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {categoryPerformance.map((item, index) => (
                                        <Box key={index}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {item.category}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700, color: item.color }}>
                                                    {item.sales}%
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={item.sales}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                                    '& .MuiLinearProgress-bar': {
                                                        background: `linear-gradient(90deg, ${item.color}aa, ${item.color})`,
                                                        borderRadius: 5,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </GlassCard>
                    </Grid>
                </Grid>
            )}

            {tabValue === 2 && (
                <GlassCard>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <TimelineIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                            Trend Analysis Coming Soon
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Advanced trend analytics and forecasting will be available here
                        </Typography>
                    </CardContent>
                </GlassCard>
            )}
        </Box>
    );
};

export default Analytics;
