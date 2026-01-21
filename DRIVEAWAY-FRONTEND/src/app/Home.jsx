import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  DirectionsCar,
  Speed,
  VerifiedUser,
  CalendarMonth,
  Handshake,
  TrendingUp,
  Search,
  LocationOn,
  CheckCircle,
} from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Browse Premium Cars',
      description: 'Explore our extensive collection of verified vehicles from trusted dealers across the region.',
    },
    {
      icon: <CalendarMonth sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Easy Booking',
      description: 'Book your preferred car in minutes with our streamlined booking process and instant confirmation.',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Verified Dealers',
      description: 'All our dealers are thoroughly vetted and approved to ensure quality and reliability.',
    },
    {
      icon: <Speed sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Quick Approval',
      description: 'Get your booking approved quickly with our automated verification system.',
    },
  ];

  const howItWorksCustomer = [
    {
      step: '01',
      title: 'Browse & Select',
      description: 'Search through our curated collection of premium vehicles and choose your perfect ride.',
      icon: <Search sx={{ fontSize: 40 }} />,
    },
    {
      step: '02',
      title: 'Book Instantly',
      description: 'Select your dates, confirm availability, and complete your booking in just a few clicks.',
      icon: <CalendarMonth sx={{ fontSize: 40 }} />,
    },
    {
      step: '03',
      title: 'Drive Away',
      description: 'Get approval from the dealer and pick up your car at the scheduled time. It\'s that simple!',
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
    },
  ];

  const howItWorksDealer = [
    {
      step: '01',
      title: 'Register',
      description: 'Sign up as a Customer and submit your business details for verification in the profile section.',
      icon: <Handshake sx={{ fontSize: 40 }} />,
    },
    {
      step: '02',
      title: 'Get Approved',
      description: 'Our admin team reviews your application and approves qualified dealers.',
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
    },
    {
      step: '03',
      title: 'List & Earn',
      description: 'Add your vehicles to the platform and start receiving booking requests instantly.',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
    },
  ];

  const metrics = [
    { value: '500+', label: 'Premium Cars' },
    { value: '150+', label: 'Verified Dealers' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '25+', label: 'Cities Covered' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #224C98 0%, #4682B4 100%)',
          position: 'relative',
          overflow: 'hidden',
          pt: 12,
          pb: 16,
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
            {/* Left Side - Text Content */}
            <Box flex={1}>
              <Chip
                label="Premium Car Rental Platform"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  mb: 3,
                  fontWeight: 600,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Drive Your Dream Car Today
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Connect with verified dealers and book premium vehicles in minutes. Your perfect ride is just a click away.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#FF6B35',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#E55A2B',
                    },
                  }}
                >
                  Start Booking
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Become a Dealer
                </Button>
              </Stack>

              {/* Stats Row */}
              <Stack direction="row" spacing={4} sx={{ mt: 6 }}>
                {metrics.slice(0, 3).map((metric, index) => (
                  <Box key={index}>
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {metric.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Right Side - Visual Element */}
            <Box
              flex={1}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1676886417721-2e180ff9adee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8bHV4dXJ5JTIwY2FyJTIwZGFzaGJvYXJkJTIwc3BlZWRvbWV0ZXIlMjBtb2Rlcm4lMjBoaWdoLXRlY2h8ZW58MHwwfHx8MTc2ODk3NDM2N3ww&ixlib=rb-4.1.0&q=85"
                alt="Luxury car dashboard by Swansway Motor Group on Unsplash"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Why Choose DriveAway?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: 600,
              fontWeight: 400,
            }}
          >
            Experience seamless car rentals with our trusted platform built for convenience and reliability.
          </Typography>
        </Stack>

        <Box
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4,
                  borderColor: 'primary.light',
                },
              }}
            >
              <CardContent className="p-8">
                <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* How It Works - Customer */}
      <Box sx={{ backgroundColor: 'grey.50', py: 12 }}>
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '2.75rem' },
              }}
            >
              How It Works for Customers
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                maxWidth: 600,
                fontWeight: 400,
              }}
            >
              Get behind the wheel in three simple steps
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            sx={{ position: 'relative' }}
          >
            {howItWorksCustomer.map((step, index) => (
              <Box
                key={index}
                flex={1}
                sx={{ position: 'relative' }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    backgroundColor: 'white',
                  }}
                >
                  <CardContent className="p-8">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 3,
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: 'grey.200',
                        mb: 2,
                      }}
                    >
                      {step.step}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* How It Works - Dealer */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            How It Works for Dealers
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: 600,
              fontWeight: 400,
            }}
          >
            Join our network and grow your business
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
        >
          {howItWorksDealer.map((step, index) => (
            <Box
              key={index}
              flex={1}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <CardContent className="p-8">
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      mb: 3,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'grey.200',
                      mb: 2,
                    }}
                  >
                    {step.step}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* Trust & Metrics Section */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={6}
            justifyContent="space-around"
            alignItems="center"
          >
            {metrics.map((metric, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 400,
                  }}
                >
                  {metric.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Card
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #224C98 0%, #4682B4 100%)',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          <CardContent className="p-12" sx={{ position: 'relative', zIndex: 1 }}>
            <Stack spacing={4} alignItems="center">
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: { xs: '2rem', md: '2.75rem' },
                }}
              >
                Ready to Get Started?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: 700,
                  fontWeight: 400,
                }}
              >
                Join thousands of satisfied customers and dealers on DriveAway. Whether you're looking to rent a car or grow your dealership business, we've got you covered.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#FF6B35',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#E55A2B',
                    },
                  }}
                >
                  Book a Car Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Register as Dealer
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: 'grey.900',
          color: 'white',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                DriveAway
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Your trusted car rental platform
              </Typography>
            </Box>
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  © 2024 DriveAway. All rights reserved.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
