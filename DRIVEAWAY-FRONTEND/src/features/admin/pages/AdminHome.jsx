import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import {
  Assignment as RequestsIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Shield as ShieldIcon,
  TrendingUp,
  Insights,
  Place,
} from '@mui/icons-material';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { isHtmlResponse } from '../../../shared/utils/responseUtils';
import { getAllApplications, getAllUsers } from '../services';
import { buildAdminAnalytics } from '../utils/analytics';
import { designGuardrails } from '@/theme/guardrails';

const metricCards = [
  {
    key: 'totalUsers',
    title: 'Total users',
    icon: <PeopleIcon />,
    color: 'primary.main',
    helper: 'Registered user base',
  },
  {
    key: 'customers',
    title: 'Customers',
    icon: <PersonAddIcon />,
    color: 'success.main',
    helper: 'Active demand-side users',
  },
  {
    key: 'dealers',
    title: 'Dealers',
    icon: <ShieldIcon />,
    color: 'secondary.main',
    helper: 'Supply-side partners',
  },
  {
    key: 'pendingApplications',
    title: 'Pending applications',
    icon: <RequestsIcon />,
    color: 'warning.main',
    helper: 'Awaiting admin action',
  },
];

const KpiCard = ({ icon, title, value, helper, color }) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      height: '100%',
      transition: 'all 0.25s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: color,
        boxShadow: (theme) => `0 12px 26px ${alpha(theme.palette.primary.main, 0.12)}`,
      },
    }}
  >
    <CardContent sx={{ p: 2.8 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color, mt: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {helper}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}
        >
          {icon}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const TrendSparkline = ({ data, color }) => {
  const max = Math.max(...data.map((item) => item.value), 1);
  const width = 360;
  const height = 120;

  const points = data
    .map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * (width - 16) + 8;
      const y = height - (item.value / max) * (height - 20) - 8;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box component="svg" viewBox={`0 0 ${width} ${height}`} sx={{ width: '100%', minWidth: 300 }}>
        <defs>
          <linearGradient id="trend-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={alpha(color, 0.35)} />
            <stop offset="100%" stopColor={alpha(color, 0)} />
          </linearGradient>
        </defs>
        <polyline
          points={`8,${height - 8} ${points} ${width - 8},${height - 8}`}
          fill="url(#trend-gradient)"
          stroke="none"
        />
        <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
        {data.map((item, index) => {
          const x = (index / Math.max(data.length - 1, 1)) * (width - 16) + 8;
          const y = height - (item.value / max) * (height - 20) - 8;
          return <circle key={item.label} cx={x} cy={y} r="3.5" fill={color} />;
        })}
      </Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
        {data.map((item) => (
          <Typography key={item.label} variant="caption" color="text.secondary">
            {item.label}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

const DistributionBars = ({ rows, color }) => {
  const max = Math.max(...rows.map((row) => row.value), 1);
  return (
    <Stack spacing={1.5}>
      {rows.map((row) => (
        <Box key={row.label}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
            <Typography variant="body2" color="text.secondary">
              {row.label}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {row.value}
            </Typography>
          </Stack>
          <Box sx={{ height: 9, borderRadius: 20, bgcolor: 'grey.200' }}>
            <Box
              sx={{
                width: `${(row.value / max) * 100}%`,
                height: '100%',
                borderRadius: 20,
                bgcolor: color,
              }}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const QuickActionCard = ({ title, description, onClick }) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: 'primary.main',
        boxShadow: (theme) => `0 10px 22px ${alpha(theme.palette.primary.main, 0.12)}`,
      },
    }}
    onClick={onClick}
  >
    <CardContent sx={{ p: 2.2 }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

function AdminHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersResponse, applicationsResponse] = await Promise.all([
          getAllUsers(),
          getAllApplications(),
        ]);

        const usersData = usersResponse?.data;
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else if (typeof usersData === 'string') {
          isHtmlResponse(usersData)
            ? toast.error('Unable to load user summary right now.')
            : toast.info(usersData);
          setUsers([]);
        } else {
          setUsers([]);
        }

        const applicationsData = applicationsResponse?.data;
        if (Array.isArray(applicationsData)) {
          setApplications(applicationsData);
        } else if (typeof applicationsData === 'string') {
          isHtmlResponse(applicationsData)
            ? toast.error('Unable to load dealer requests right now.')
            : toast.info(applicationsData);
          setApplications([]);
        } else {
          setApplications([]);
        }
      } catch {
        toast.error('Failed to load admin dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const analytics = useMemo(() => buildAdminAnalytics(users, applications), [users, applications]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        gap={2}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Loading admin analytics dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: designGuardrails.layout.pageX,
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ mb: 3.5 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: (theme) => `0 8px 22px ${alpha(theme.palette.primary.main, 0.35)}`,
            }}
          >
            <DashboardIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ letterSpacing: '-0.02em' }}>
              SAP-style Admin Control Tower
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time business visibility for user growth, partner onboarding, and operational load.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Grid container spacing={2.3} sx={{ mb: 2.3 }}>
        {metricCards.map((card) => (
          <Grid key={card.key} size={{ xs: 12, sm: 6, lg: 3 }}>
            <KpiCard
              title={card.title}
              icon={card.icon}
              value={analytics.summary[card.key]}
              helper={card.helper}
              color={card.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.3} sx={{ mb: 2.3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2.8 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUp color="primary" />
                  <Typography variant="h6">Applications trend (last 6 months)</Typography>
                </Stack>
                <Chip
                  size="small"
                  color={analytics.summary.bookingVelocity >= 0 ? 'success' : 'error'}
                  label={`${analytics.summary.bookingVelocity >= 0 ? '+' : ''}${
                    analytics.summary.bookingVelocity
                  }% MoM`}
                />
              </Stack>
              <TrendSparkline data={analytics.trends.applications} color="#1E3A8A" />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: 2.8 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Insights color="primary" />
                <Typography variant="h6">User mix</Typography>
              </Stack>
              <DistributionBars rows={analytics.distribution.userMix} color="#0F766E" />
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip
                  label={`Dealer mix: ${analytics.summary.dealerMix}%`}
                  color="secondary"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={`Customer mix: ${analytics.summary.customerMix}%`}
                  color="success"
                  size="small"
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.3} sx={{ mb: 2.3 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2.8 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Place color="primary" />
                <Typography variant="h6">Demand by location</Typography>
              </Stack>
              {analytics.distribution.locations.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No location insights yet.
                </Typography>
              ) : (
                <DistributionBars rows={analytics.distribution.locations} color="#2563EB" />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: 2.8 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Operational health
              </Typography>
              <Stack spacing={1.2}>
                <Chip
                  label={`Applications per dealer: ${analytics.summary.applicationsPerDealer}`}
                  color="warning"
                  variant="outlined"
                />
                <Chip
                  label={
                    analytics.summary.pendingApplications > 25
                      ? 'Backlog risk: high'
                      : 'Backlog risk: controlled'
                  }
                  color={analytics.summary.pendingApplications > 25 ? 'error' : 'success'}
                  variant="outlined"
                />
                <Chip
                  label={
                    analytics.summary.bookingVelocity >= 0
                      ? 'Intake momentum: positive'
                      : 'Intake momentum: needs attention'
                  }
                  color={analytics.summary.bookingVelocity >= 0 ? 'success' : 'error'}
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 2.8 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Recent dealer applications</Typography>
                <Button size="small" variant="outlined" onClick={() => navigate('/admin/applications')}>
                  Review queue
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {analytics.recentApplications.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No pending applications available.
                </Typography>
              ) : (
                <Stack spacing={1.6}>
                  {analytics.recentApplications.map((application, index) => (
                    <Box key={application.id || index}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        spacing={1}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            {application.dealerShipName || 'Dealer application'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Owner: {application.ownerName || 'Pending'} • Location:{' '}
                            {application.location || 'Pending'}
                          </Typography>
                        </Box>
                        <Chip label="Pending" color="warning" size="small" />
                      </Stack>
                      {index !== analytics.recentApplications.length - 1 ? <Divider sx={{ mt: 1.6 }} /> : null}
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={1.6}>
            <QuickActionCard
              title="Manage users"
              description="Audit customer and dealer profiles with role-wise listing."
              onClick={() => navigate('/admin/all')}
            />
            <QuickActionCard
              title="Approve dealers"
              description="Process partner onboarding requests in queue."
              onClick={() => navigate('/admin/applications')}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;
