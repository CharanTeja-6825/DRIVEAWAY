import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { Label } from '../components/ui/label';
import { customerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CustomerLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    customer_license_no: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // In a real app, you'd call a login API endpoint
      // For now, we'll simulate with getAllCustomers and find match
      const response = await customerAPI.getAllCustomers();
      const customers = Array.isArray(response.data) ? response.data : [];
      
      const customer = customers.find(
        (c) =>
          c.customer_license_no === formData.customer_license_no &&
          c.password === formData.password
      );

      if (customer) {
        login(customer, 'customer');
        navigate('/customer/dashboard');
      } else {
        setError('Invalid license number or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Person sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <CardTitle className="text-2xl font-bold">Customer Login</CardTitle>
            <CardDescription>
              Welcome back! Sign in to manage your bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    type="text"
                    placeholder="Enter your license number"
                    value={formData.customer_license_no}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_license_no: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Don't have an account?{' '}
                  <MuiLink
                    component="button"
                    type="button"
                    onClick={() => navigate('/customer/register')}
                    sx={{ cursor: 'pointer' }}
                  >
                    Register here
                  </MuiLink>
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CustomerLoginPage;
