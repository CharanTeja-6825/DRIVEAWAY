import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { Store } from '@mui/icons-material';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { Label } from '../components/ui/label';
import { dealerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DealerLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    dealer_gst_in: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await dealerAPI.getAllDealers();
      const dealers = Array.isArray(response.data) ? response.data : [];
      
      const dealer = dealers.find(
        (d) =>
          d.dealer_gst_in === formData.dealer_gst_in &&
          d.password === formData.password
      );

      if (dealer) {
        if (!dealer.approval_status) {
          setError('Your account is pending admin approval');
          return;
        }
        login(dealer, 'dealer');
        navigate('/dealer/dashboard');
      } else {
        setError('Invalid GST number or password');
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
              <Store sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <CardTitle className="text-2xl font-bold">Dealer Login</CardTitle>
            <CardDescription>
              Sign in to manage your dealership
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
                  <Label htmlFor="gst">GST Number</Label>
                  <Input
                    id="gst"
                    type="text"
                    placeholder="Enter your GST number"
                    value={formData.dealer_gst_in}
                    onChange={(e) =>
                      setFormData({ ...formData, dealer_gst_in: e.target.value })
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
                    onClick={() => navigate('/dealer/register')}
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

export default DealerLoginPage;
