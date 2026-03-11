import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TuneIcon from "@mui/icons-material/Tune";
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";

const drawerWidth = 260;

//#e6e6fb all over bg

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: '12px',
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginLeft: theme.spacing(2),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20ch",
    "&:focus": {
      width: "28ch",
    },
  },
}));

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
    { text: "Products", icon: <InventoryIcon />, path: "/products" },
    { text: "Categories", icon: <CategoryIcon />, path: "/category" },
    { text: "Supplier", icon: <LocalShippingIcon />, path: "/supplier" },
    { text: "Purchases", icon: <ShoppingCartIcon />, path: "/purchase" },
    { text: "Sales", icon: <PointOfSaleIcon />, path: "/sales" },
    { text: "Stock Adjustment", icon: <TuneIcon />, path: "/stock" },
    { text: "Reports", icon: <AssessmentIcon />, path: "/reports" },
    { text: "Settings", icon: <SettingsIcon />, path: "/setting" },
    { text: "Users", icon: <PeopleIcon />, path: "/user" },
  ];

  const drawer = (
    <div>
      <Toolbar >
        <Typography variant="h6">Clinic Dashboard</Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* ================= TOP BAR ================= */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: "1px solid",
          borderColor: "divider",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              fontWeight={700}
              fontSize={18}
              sx={{
                color: '#6366f1',
              }}
            >
              Inventory Management System
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Search */}
            <Search sx={{ display: { xs: 'none', md: 'block' } }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                sx={{ color: 'text.primary' }}
              />
            </Search>

            {/* Notifications */}
            <IconButton
              component={Link}
              to="/notifications"
              sx={{
                color: 'text.primary',
                '&:hover': { background: 'rgba(99, 102, 241, 0.1)' }
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile */}
            <IconButton
              component={Link}
              to="/profile"
              sx={{
                color: 'text.primary',
                '&:hover': { background: 'rgba(99, 102, 241, 0.1)' }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            // background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
            background: '#6366f1',
            backdropFilter: 'blur(10px)',
            borderRight: "1px solid rgba(102, 126, 234, 0.1)",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          <Typography
            fontWeight={800}
            fontSize={20}
            sx={{
              color: '#6366f1',
            }}
          >
            📦 Inventory Pro
          </Typography>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(102, 126, 234, 0.1)' }} />

        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    background: active
                      ? '#6366f1'
                      : 'transparent',
                    color: active ? 'white' : 'inherit',
                    transition: 'all 0.3s ease',
                    "&:hover": {
                      background: active
                        ? '#4f46e5'
                        : 'rgba(99, 102, 241, 0.08)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? 'white' : 'text.secondary',
                      minWidth: 36,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: active ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );

}
