import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  DirectionsCar,
  Logout,
  Dashboard,
  Person,
  CarRental,
  AddCircle,
  CalendarMonth,
  People,
  Assignment,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from '../shared/hooks/AuthProvider';

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/', { replace: true });
  };

  const handleNavClick = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  // Customer Navigation Items
  const customerNavItems = [
    { label: 'Home', icon: <Dashboard />, path: '/customer' },
    { label: 'Profile', icon: <Person />, path: '/customer/profile' },
    { label: 'Browse Cars', icon: <CarRental />, path: '/customer/viewCars' },
    { label: 'My Bookings', icon: <CalendarMonth />, path: '/customer/myBookings' },
  ];

  // Dealer Navigation Items
  const dealerNavItems = [
    { label: 'Home', icon: <Dashboard />, path: '/dealer' },
    { label: 'Add Car', icon: <AddCircle />, path: '/dealer/addCar' },
    { label: 'My Cars', icon: <CarRental />, path: '/dealer/allCars' },
    { label: 'Bookings', icon: <CalendarMonth />, path: '/dealer/bookings' },
  ];

  // Admin Navigation Items
  const adminNavItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { label: 'Users', icon: <People />, path: '/admin/all' },
    { label: 'Requests', icon: <Assignment />, path: '/admin/applications' },
  ];

  const getNavItems = () => {
    if (!isLoggedIn) return [];
    if (user.role === 'CUSTOMER') return customerNavItems;
    if (user.role === 'DEALER') return dealerNavItems;
    if (user.role === 'ADMIN') return adminNavItems;
    return [];
  };

  const navItems = getNavItems();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
            <DirectionsCar sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography
              variant="h5"
              component={Link}
              to={
                user ?
                user.role === "ADMIN" ? "/admin" : 
                user.role === "CUSTOMER" ? "/customer" : 
                user.role === "DEALER" ? "/dealer" : 
                "*"
                :
                "/"
              }
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              DriveAway
            </Typography>
          </Stack>

          {/* Navigation Links */}
          {!isLoggedIn && (
            <Stack direction="row" spacing={1}>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'grey.50',
                  },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{ fontWeight: 600 }}
              >
                Register
              </Button>
            </Stack>
          )}

          {/* Logged In Navigation - Desktop */}
          {isLoggedIn && !isMobile && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                  }}
                >
                  {getInitials(user?.email)}
                </Avatar>
                <Button
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ fontWeight: 600 }}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          )}

          {/* Logged In Navigation - Mobile */}
          {isLoggedIn && isMobile && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                {getInitials(user?.email)}
              </Avatar>
              <IconButton onClick={handleMenuOpen} sx={{ color: 'text.primary' }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: '12px',
                  },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem key={item.path} onClick={() => handleNavClick(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.label}</ListItemText>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout color="error" />
                  </ListItemIcon>
                  <ListItemText sx={{ color: 'error.main' }}>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

