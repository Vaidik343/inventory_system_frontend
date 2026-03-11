import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
    TextField,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const GlassCard = styled(Card)({
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
});

const GradientAvatar = styled(Avatar)({
    width: 120,
    height: 120,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontSize: '48px',
    fontWeight: 700,
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
});

const StatBox = styled(Box)(({ gradient }) => ({
    background: gradient,
    borderRadius: '16px',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        darkMode: false,
        autoBackup: true,
    });

    const handleSettingChange = (setting) => {
        setSettings((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    const userStats = [
        { label: 'Products Added', value: '247', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { label: 'Orders Managed', value: '1,234', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { label: 'Suppliers', value: '45', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
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
                    My Profile
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Manage your account settings and preferences
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column - Profile Info */}
                <Grid item xs={12} md={4}>
                    <GlassCard>
                        <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                            <GradientAvatar sx={{ mx: 'auto', mb: 2 }}>
                                VK
                            </GradientAvatar>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    Vaidik Kumar
                                </Typography>
                                <VerifiedIcon sx={{ color: '#667eea', fontSize: 20 }} />
                            </Box>

                            <Chip
                                label="Admin"
                                size="small"
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    fontWeight: 600,
                                    mb: 3,
                                }}
                            />

                            <List sx={{ textAlign: 'left' }}>
                                <ListItem>
                                    <ListItemIcon>
                                        <EmailIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Email"
                                        secondary="vaidik@example.com"
                                        secondaryTypographyProps={{ sx: { fontWeight: 600 } }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Phone"
                                        secondary="+91 98765 43210"
                                        secondaryTypographyProps={{ sx: { fontWeight: 600 } }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationOnIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Location"
                                        secondary="Mumbai, India"
                                        secondaryTypographyProps={{ sx: { fontWeight: 600 } }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <BusinessIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Company"
                                        secondary="Inventory Solutions"
                                        secondaryTypographyProps={{ sx: { fontWeight: 600 } }}
                                    />
                                </ListItem>
                            </List>

                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                fullWidth
                                sx={{
                                    mt: 3,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '12px',
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '15px',
                                }}
                                onClick={() => setEditMode(!editMode)}
                            >
                                {editMode ? 'Save Changes' : 'Edit Profile'}
                            </Button>
                        </CardContent>
                    </GlassCard>

                    {/* Stats */}
                    <GlassCard sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                Activity Stats
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {userStats.map((stat, index) => (
                                    <StatBox key={index} gradient={stat.gradient}>
                                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            {stat.label}
                                        </Typography>
                                    </StatBox>
                                ))}
                            </Box>
                        </CardContent>
                    </GlassCard>
                </Grid>

                {/* Right Column - Settings & Details */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Personal Information */}
                        <GlassCard>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Personal Information
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            defaultValue="Vaidik"
                                            disabled={!editMode}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            defaultValue="Kumar"
                                            disabled={!editMode}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            defaultValue="vaidik@example.com"
                                            disabled={!editMode}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            defaultValue="+91 98765 43210"
                                            disabled={!editMode}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            defaultValue="123 Business Street, Mumbai, Maharashtra"
                                            disabled={!editMode}
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </GlassCard>

                        {/* Settings */}
                        <GlassCard>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Preferences & Settings
                                </Typography>

                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <NotificationsIcon sx={{ color: 'primary.main' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Email Notifications"
                                            secondary="Receive email updates about your inventory"
                                        />
                                        <Switch
                                            checked={settings.emailNotifications}
                                            onChange={() => handleSettingChange('emailNotifications')}
                                        />
                                    </ListItem>
                                    <Divider />

                                    <ListItem>
                                        <ListItemIcon>
                                            <NotificationsIcon sx={{ color: 'primary.main' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Push Notifications"
                                            secondary="Get instant alerts on your device"
                                        />
                                        <Switch
                                            checked={settings.pushNotifications}
                                            onChange={() => handleSettingChange('pushNotifications')}
                                        />
                                    </ListItem>
                                    <Divider />

                                    <ListItem>
                                        <ListItemIcon>
                                            <PaletteIcon sx={{ color: 'primary.main' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Dark Mode"
                                            secondary="Use dark theme for the interface"
                                        />
                                        <Switch
                                            checked={settings.darkMode}
                                            onChange={() => handleSettingChange('darkMode')}
                                        />
                                    </ListItem>
                                    <Divider />

                                    <ListItem>
                                        <ListItemIcon>
                                            <SecurityIcon sx={{ color: 'primary.main' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Auto Backup"
                                            secondary="Automatically backup your data daily"
                                        />
                                        <Switch
                                            checked={settings.autoBackup}
                                            onChange={() => handleSettingChange('autoBackup')}
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </GlassCard>

                        {/* Security */}
                        <GlassCard>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Security
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SecurityIcon />}
                                        sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                                    >
                                        Change Password
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SecurityIcon />}
                                        sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                                    >
                                        Two-Factor Authentication
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<LanguageIcon />}
                                        sx={{ justifyContent: 'flex-start', textTransform: 'none', py: 1.5 }}
                                    >
                                        Active Sessions
                                    </Button>
                                </Box>
                            </CardContent>
                        </GlassCard>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
