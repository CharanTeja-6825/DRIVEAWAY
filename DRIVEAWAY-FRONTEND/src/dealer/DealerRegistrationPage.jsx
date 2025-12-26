import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { AddBusiness } from '@mui/icons-material';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { Label } from '../components/ui/label';
import { dealerAPI } from '../services/api';

const DealerRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dealer_ship_name: '',
    dealer_oname: '',
    dealer_phone: '',
    dealer_gst_in: '',
    location: '',
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

    try {
      const dealerData = {
        dealer_ship_name: formData.dealer_ship_name,
        dealer_oname: formData.dealer_oname,
        dealer_phone: formData.dealer_phone,
        dealer_gst_in: formData.dealer_gst_in,
        location: formData.location,
        password: formData.password,
        approval_status: false,
        role: 'DEALER',
        created_at: new Date().toISOString(),
      };

      await dealerAPI.addDealer(dealerData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dealer/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. GST number may already exist.');
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
              <AddBusiness sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <CardTitle className="text-2xl font-bold">Dealer Registration</CardTitle>
            <CardDescription>
              Register your dealership to start listing cars
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
                    Registration successful! Please wait for admin approval. Redirecting...
                  </Alert>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="dealership">Dealership Name</Label>
                  <Input
                    id="dealership"
                    type="text"
                    placeholder="Enter dealership name"
                    value={formData.dealer_ship_name}
                    onChange={(e) =>
                      setFormData({ ...formData, dealer_ship_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="owner">Owner Name</Label>
                  <Input
                    id="owner"
                    type="text"
                    placeholder="Enter owner name"
                    value={formData.dealer_oname}
                    onChange={(e) =>
                      setFormData({ ...formData, dealer_oname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.dealer_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, dealer_phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input
                    id="gst"
                    type="text"
                    placeholder="Enter GST number"
                    value={formData.dealer_gst_in}
                    onChange={(e) =>
                      setFormData({ ...formData, dealer_gst_in: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter business location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
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
                  Register Dealership
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <MuiLink
                    component="button"
                    type="button"
                    onClick={() => navigate('/dealer/login')}
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

export default DealerRegistrationPage;
