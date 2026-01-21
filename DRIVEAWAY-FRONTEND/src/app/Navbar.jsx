import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
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
} from '@mui/icons-material';
import { useAuth } from '../shared/hooks/AuthProvider';

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

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
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <DirectionsCar sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
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
          <Stack direction="row" spacing={1}>
            {!isLoggedIn && (
              <>
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
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}

            {isLoggedIn && (
              <>
                {/* Customer Navigation */}
                {user.role === 'CUSTOMER' && (
                  <>
                    <Button
                      component={Link}
                      to="/customer"
                      startIcon={<Dashboard />}
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
                      to="/customer/profile"
                      startIcon={<Person />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      component={Link}
                      to="/customer/viewCars"
                      startIcon={<CarRental />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      Cars
                    </Button>
                    <Button
                      component={Link}
                      to="/customer/myBookings"
                      startIcon={<CalendarMonth />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      My Bookings
                    </Button>
                  </>
                )}

                {/* Dealer Navigation */}
                {user.role === 'DEALER' && (
                  <>
                    <Button
                      component={Link}
                      to="/dealer"
                      startIcon={<Dashboard />}
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
                      to="/dealer/addCar"
                      startIcon={<AddCircle />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      New Car
                    </Button>
                    <Button
                      component={Link}
                      to="/dealer/allCars"
                      startIcon={<CarRental />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      Cars
                    </Button>
                    <Button
                      component={Link}
                      to="/dealer/bookings"
                      startIcon={<CalendarMonth />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      Bookings
                    </Button>
                  </>
                )}

                {/* Admin Navigation */}
                {user.role === 'ADMIN' && (
                  <>
                    <Button
                      component={Link}
                      to="/admin"
                      startIcon={<Dashboard />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      component={Link}
                      to="/admin/all"
                      startIcon={<People />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      All Users
                    </Button>
                    <Button
                      component={Link}
                      to="/admin/applications"
                      startIcon={<Assignment />}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                        },
                      }}
                    >
                      Requests
                    </Button>
                  </>
                )}

                <Button
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  variant="outlined"
                  color="error"
                  sx={{
                    fontWeight: 600,
                    ml: 1,
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
