import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { Label } from '../components/ui/label';
import { customerAPI } from '../services/api';

const CustomerRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_age: '',
    customer_license_no: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.customer_age < 18) {
      setError('You must be at least 18 years old to register');
      return;
    }

    try {
      const customerData = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_age: parseInt(formData.customer_age),
        customer_license_no: formData.customer_license_no,
        password: formData.password,
        role: 'CUSTOMER',
        created_at: new Date().toISOString(),
      };

      await customerAPI.addCustomer(customerData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/customer/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. License number may already exist.');
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
        py: 4,
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
              <PersonAdd sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <CardTitle className="text-2xl font-bold">Customer Registration</CardTitle>
            <CardDescription>
              Create your account to start booking cars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="grid gap-4">
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Registration successful! Redirecting to login...
                  </Alert>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.customer_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.customer_age}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_age: e.target.value })
                    }
                    required
                    min="18"
                  />
                </div>
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={success}>
                  Register
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <MuiLink
                    component="button"
                    type="button"
                    onClick={() => navigate('/customer/login')}
                    sx={{ cursor: 'pointer' }}
                  >
                    Sign in
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

export default CustomerRegistrationPage;
