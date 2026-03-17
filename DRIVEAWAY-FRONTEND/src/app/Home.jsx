import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  alpha,
  useTheme,
} from '@mui/material';
import {
  DirectionsCar,
  Speed,
  VerifiedUser,
  CalendarMonth,
  Handshake,
  TrendingUp,
  Search,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { designGuardrails, userFacingCopy } from '@/theme/guardrails';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const rootRef = useRef(null);
  const heroRef = useRef(null);

  const features = [
    {
      icon: <Search sx={{ fontSize: 38, color: 'primary.main' }} />,
      title: 'Curated premium fleet',
      description:
        'Browse trusted inventory from verified dealers with transparent availability and booking terms.',
    },
    {
      icon: <CalendarMonth sx={{ fontSize: 38, color: 'primary.main' }} />,
      title: 'Fast booking experience',
      description:
        'Reserve your car in minutes with clear steps, instant confirmation, and seamless follow-up.',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 38, color: 'primary.main' }} />,
      title: 'Verified partners only',
      description:
        'DriveAway onboards and reviews each dealer application to keep rentals reliable and safe.',
    },
    {
      icon: <Speed sx={{ fontSize: 38, color: 'primary.main' }} />,
      title: 'Operationally efficient',
      description:
        'Real-time processing keeps customer requests and dealer approvals moving without delays.',
    },
  ];

  const customerJourney = [
    {
      step: '01',
      title: 'Discover',
      description: 'Filter by location, class, and availability to find your best-fit ride quickly.',
      icon: <Search sx={{ fontSize: 32 }} />,
    },
    {
      step: '02',
      title: 'Reserve',
      description: 'Select dates and lock your booking through a guided, low-friction checkout flow.',
      icon: <CalendarMonth sx={{ fontSize: 32 }} />,
    },
    {
      step: '03',
      title: 'Drive',
      description: 'Get approval and collect your vehicle with clear pickup details and timelines.',
      icon: <DirectionsCar sx={{ fontSize: 32 }} />,
    },
  ];

  const dealerJourney = [
    {
      step: '01',
      title: 'Apply',
      description: 'Submit dealership details and compliance data in a structured onboarding flow.',
      icon: <Handshake sx={{ fontSize: 32 }} />,
    },
    {
      step: '02',
      title: 'Get verified',
      description: 'Our admin team reviews applications and tracks approval status transparently.',
      icon: <CheckCircle sx={{ fontSize: 32 }} />,
    },
    {
      step: '03',
      title: 'Scale rentals',
      description: 'List vehicles, receive requests, and grow utilization through the DriveAway network.',
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
    },
  ];

  const heroStats = [
    { value: '500+', label: 'Cars ready to book' },
    { value: '150+', label: 'Verified dealers' },
    { value: '10K+', label: 'Customer trips' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hero-pill',
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: designGuardrails.motion.fast }
      )
        .fromTo(
          '.hero-title',
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: designGuardrails.motion.medium },
          '-=0.05'
        )
        .fromTo(
          '.hero-subtitle',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: designGuardrails.motion.medium },
          '-=0.25'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: designGuardrails.motion.medium,
            stagger: designGuardrails.motion.stagger,
          },
          '-=0.25'
        )
        .fromTo(
          '.hero-stat',
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: designGuardrails.motion.medium,
            stagger: designGuardrails.motion.stagger,
          },
          '-=0.2'
        )
        .fromTo(
          '.hero-visual',
          { x: 42, autoAlpha: 0, rotate: -5 },
          {
            x: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: designGuardrails.motion.slow,
          },
          '-=0.55'
        );

      gsap.to('.floating-card', {
        y: '+=12',
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        stagger: 0.35,
        ease: 'sine.inOut',
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={rootRef} sx={{ bgcolor: 'background.default' }}>
      <Box
        ref={heroRef}
        sx={{
          background: `radial-gradient(circle at 15% 15%, ${alpha(theme.palette.primary.light, 0.35)} 0%, transparent 45%),
            linear-gradient(140deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 70%)`,
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.18,
            backgroundImage: `linear-gradient(${alpha('#FFFFFF', 0.35)} 1px, transparent 1px),
              linear-gradient(90deg, ${alpha('#FFFFFF', 0.35)} 1px, transparent 1px)`,
            backgroundSize: { xs: '40px 40px', md: '58px 58px' },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Box className="hero-pill" sx={{ opacity: 0 }}>
                  <Badge className="bg-white/20 border-white/30 text-white px-3 py-1">
                    User-first premium mobility platform
                  </Badge>
                </Box>

                <Typography
                  className="hero-title"
                  variant="h1"
                  sx={{
                    opacity: 0,
                    color: 'common.white',
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.9rem' },
                    maxWidth: 760,
                  }}
                >
                  Book your next drive with confidence.
                </Typography>

                <Typography
                  className="hero-subtitle"
                  variant="h6"
                  sx={{
                    opacity: 0,
                    color: alpha(theme.palette.common.white, 0.9),
                    maxWidth: 640,
                    fontWeight: 400,
                    lineHeight: 1.65,
                  }}
                >
                  {userFacingCopy.brandPromise} Discover high-quality listings, reserve instantly,
                  and move from search to keys in a frictionless experience.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    className="hero-cta"
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForward />}
                    sx={{
                      opacity: 0,
                      bgcolor: 'accent.main',
                      color: 'common.white',
                      px: 3.5,
                      py: 1.25,
                      '&:hover': { bgcolor: 'accent.dark' },
                    }}
                  >
                    Start booking
                  </Button>
                  <Button
                    className="hero-cta"
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      opacity: 0,
                      borderColor: alpha(theme.palette.common.white, 0.8),
                      color: 'common.white',
                      px: 3.5,
                      py: 1.25,
                      '&:hover': {
                        borderColor: 'common.white',
                        bgcolor: alpha(theme.palette.common.white, 0.12),
                      },
                    }}
                  >
                    Become a dealer
                  </Button>
                </Stack>

                <Grid container spacing={2} sx={{ pt: 1 }}>
                  {heroStats.map((stat) => (
                    <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                      <Box
                        className="hero-stat"
                        sx={{
                          opacity: 0,
                          p: 2.2,
                          borderRadius: designGuardrails.radius.md,
                          border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
                          bgcolor: alpha(theme.palette.common.white, 0.08),
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <Typography variant="h4" sx={{ color: 'common.white', mb: 0.4 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: alpha('#FFFFFF', 0.84) }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                className="hero-visual"
                sx={{
                  opacity: 0,
                  position: 'relative',
                  minHeight: { xs: 320, sm: 380, md: 470 },
                  borderRadius: designGuardrails.radius.lg,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  backdropFilter: 'blur(14px)',
                  p: 3,
                  boxShadow: designGuardrails.elevation.strong,
                }}
              >
                <Stack spacing={2}>
                  <Badge className="w-fit bg-emerald-500 text-white border-transparent">Live availability</Badge>
                  <Typography variant="h5" sx={{ color: 'common.white' }}>
                    Fleet readiness snapshot
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha('#FFFFFF', 0.85), maxWidth: 300 }}>
                    A modern booking surface designed for quick decisions on every screen size.
                  </Typography>
                </Stack>

                <Stack spacing={1.6} sx={{ mt: 3 }}>
                  {[
                    { label: 'SUV', fill: 84 },
                    { label: 'Sedan', fill: 73 },
                    { label: 'Luxury', fill: 65 },
                    { label: 'Electric', fill: 58 },
                  ].map((item) => (
                    <Box key={item.label}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: alpha('#FFFFFF', 0.8) }}>
                          {item.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: alpha('#FFFFFF', 0.8) }}>
                          {item.fill}%
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          mt: 0.6,
                          height: 7,
                          borderRadius: 50,
                          bgcolor: alpha(theme.palette.common.white, 0.2),
                        }}
                      >
                        <Box
                          sx={{
                            width: `${item.fill}%`,
                            height: '100%',
                            borderRadius: 50,
                            bgcolor: 'accent.main',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>

                <Box
                  className="floating-card"
                  sx={{
                    position: 'absolute',
                    right: -20,
                    top: 48,
                    px: 2,
                    py: 1.2,
                    borderRadius: 2,
                    bgcolor: 'common.white',
                    color: 'text.primary',
                    boxShadow: designGuardrails.elevation.subtle,
                  }}
                >
                  <Typography variant="subtitle2">+22% booking velocity</Typography>
                </Box>

                <Box
                  className="floating-card"
                  sx={{
                    position: 'absolute',
                    left: -22,
                    bottom: 36,
                    px: 2,
                    py: 1.2,
                    borderRadius: 2,
                    bgcolor: 'common.white',
                    color: 'text.primary',
                    boxShadow: designGuardrails.elevation.subtle,
                  }}
                >
                  <Typography variant="subtitle2">4.9 / 5 partner trust</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: designGuardrails.layout.sectionY }}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 6 }}>
          <Typography variant="overline" color="primary.main">
            Experience architecture
          </Typography>
          <Typography variant="h2" sx={{ textAlign: 'center', fontSize: { xs: '1.9rem', md: '2.8rem' } }}>
            Designed for confidence at every click
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', maxWidth: 720 }}
          >
            We combine intuitive UX with operational clarity so customers and dealers complete actions faster.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {features.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, md: 6 }}>
              <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <Box sx={{ mb: 2.5 }}>{feature.icon}</Box>
                  <CardTitle className="mb-2 text-slate-900">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'grey.50', py: designGuardrails.layout.sectionY }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Customer journey
              </Typography>
              <Stack spacing={2}>
                {customerJourney.map((item) => (
                  <Card key={item.step} className="border-slate-200">
                    <CardContent className="pt-6">
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="overline" color="primary.main">
                            Step {item.step}
                          </Typography>
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Dealer journey
              </Typography>
              <Stack spacing={2}>
                {dealerJourney.map((item) => (
                  <Card key={item.step} className="border-slate-200">
                    <CardContent className="pt-6">
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: 'secondary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="overline" color="secondary.main">
                            Step {item.step}
                          </Typography>
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: designGuardrails.layout.sectionY }}>
        <Card className="overflow-hidden border-0">
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'common.white',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h3" sx={{ color: 'common.white', mb: 1 }}>
                  Ready to elevate your rental experience?
                </Typography>
                <Typography variant="body1" sx={{ color: alpha(theme.palette.common.white, 0.9) }}>
                  Join DriveAway to access premium inventory, reliable partners, and a UX designed to keep every
                  booking clear and fast.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }} spacing={1.4}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      bgcolor: 'common.white',
                      color: 'primary.main',
                      '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.9) },
                    }}
                  >
                    Create account
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: alpha(theme.palette.common.white, 0.75),
                      color: 'common.white',
                      '&:hover': {
                        borderColor: 'common.white',
                        bgcolor: alpha(theme.palette.common.white, 0.12),
                      },
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default Home;
