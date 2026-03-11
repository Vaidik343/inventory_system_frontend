import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Tabs,
    Tab,
    Badge,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const GlassCard = styled(Card)({
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
});

const NotificationCard = styled(Box)(({ unread }) => ({
    padding: '16px',
    borderRadius: '12px',
    background: unread ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
    border: `1px solid ${unread ? 'rgba(99, 102, 241, 0.2)' : 'transparent'}`,
    marginBottom: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        background: 'rgba(99, 102, 241, 0.1)',
        transform: 'translateX(5px)',
    },
}));

const Notifications = () => {
    const [tabValue, setTabValue] = useState(0);

    const notifications = [
        {
            id: 1,
            type: 'warning',
            title: 'Low Stock Alert',
            message: 'iPhone 15 Pro stock is running low. Only 5 units remaining.',
            time: '5 minutes ago',
            icon: <WarningIcon />,
            color: '#f59e0b',
            unread: true,
            category: 'stock'
        },
        {
            id: 2,
            type: 'success',
            title: 'Order Completed',
            message: 'Order #4521 has been successfully completed and shipped.',
            time: '15 minutes ago',
            icon: <CheckCircleIcon />,
            color: '#10b981',
            unread: true,
            category: 'orders'
        },
        {
            id: 3,
            type: 'info',
            title: 'New Product Added',
            message: 'MacBook Pro 16" has been added to inventory.',
            time: '1 hour ago',
            icon: <InventoryIcon />,
            color: '#667eea',
            unread: false,
            category: 'products'
        },
        {
            id: 4,
            type: 'warning',
            title: 'Supplier Payment Due',
            message: 'Payment to Tech Supplies Inc. is due in 3 days.',
            time: '2 hours ago',
            icon: <LocalShippingIcon />,
            color: '#f59e0b',
            unread: false,
            category: 'suppliers'
        },
        {
            id: 5,
            type: 'info',
            title: 'Stock Adjustment',
            message: '15 units of Samsung Galaxy S24 added to inventory.',
            time: '3 hours ago',
            icon: <InventoryIcon />,
            color: '#667eea',
            unread: false,
            category: 'stock'
        },
        {
            id: 6,
            type: 'success',
            title: 'New Order Received',
            message: 'Order #4522 received for $1,245.00',
            time: '4 hours ago',
            icon: <ShoppingCartIcon />,
            color: '#10b981',
            unread: false,
            category: 'orders'
        },
        {
            id: 7,
            type: 'warning',
            title: 'Price Update Required',
            message: 'Sony WH-1000XM5 price needs review due to market changes.',
            time: '5 hours ago',
            icon: <InfoIcon />,
            color: '#f59e0b',
            unread: false,
            category: 'products'
        },
    ];

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filterNotifications = () => {
        if (tabValue === 0) return notifications;
        if (tabValue === 1) return notifications.filter(n => n.unread);
        const categories = ['stock', 'orders', 'products', 'suppliers'];
        return notifications.filter(n => n.category === categories[tabValue - 2]);
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Notifications
                    </Typography>
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsActiveIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    </Badge>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Stay updated with your inventory activities
                </Typography>
            </Box>

            {/* Tabs */}
            <GlassCard sx={{ mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 2,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '14px',
                        },
                    }}
                >
                    <Tab label="All Notifications" />
                    <Tab label={`Unread (${unreadCount})`} />
                    <Tab label="Stock Alerts" />
                    <Tab label="Orders" />
                    <Tab label="Products" />
                    <Tab label="Suppliers" />
                </Tabs>
            </GlassCard>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip
                    icon={<MarkEmailReadIcon />}
                    label="Mark All as Read"
                    clickable
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        },
                    }}
                />
                <Chip
                    icon={<DeleteOutlineIcon />}
                    label="Clear All"
                    clickable
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {/* Notifications List */}
            <GlassCard>
                <CardContent>
                    {filterNotifications().length > 0 ? (
                        filterNotifications().map((notification) => (
                            <NotificationCard key={notification.id} unread={notification.unread}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: `${notification.color}20`,
                                            color: notification.color,
                                            width: 48,
                                            height: 48,
                                        }}
                                    >
                                        {notification.icon}
                                    </Avatar>

                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                {notification.title}
                                            </Typography>
                                            <IconButton size="small" sx={{ color: 'text.secondary' }}>
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                            {notification.message}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {notification.time}
                                            </Typography>
                                            {notification.unread && (
                                                <Chip
                                                    label="New"
                                                    size="small"
                                                    sx={{
                                                        height: '20px',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        color: 'white',
                                                        fontSize: '11px',
                                                        fontWeight: 700,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </NotificationCard>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <NotificationsActiveIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                No notifications in this category
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </GlassCard>
        </Box>
    );
};

export default Notifications;
