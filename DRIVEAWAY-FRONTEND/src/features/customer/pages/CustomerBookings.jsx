import React, { useState, useEffect } from 'react';
import { getCustomerBookings, cancelBooking } from '../services';
import { useAuth } from '../../../shared/hooks/AuthProvider';
import BookingsList from '../components/BookingsList';
import {
  CircularProgress,
  Container,
  Typography,
  Stack,
  Box,
  Paper,
} from '@mui/material';
import { EventNote } from '@mui/icons-material';
import { toast } from 'sonner';

function CustomerBookings() {
  const { user } = useAuth();

  const [customerBookings, setCustomerBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomerBookings = async () => {
    try {
      const { data } = await getCustomerBookings(user.userId);
      console.log(data);
      setCustomerBookings(data);
    } catch (err) {
      toast.error(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const { data } = await cancelBooking(bookingId);
      toast.success(data || "Booking cancelled successfully");
      fetchCustomerBookings();  
    } catch (err) {
      toast.error(err.message || "Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchCustomerBookings();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
          <CircularProgress size={48} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Loading your bookings...
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Page Header */}
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EventNote sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  My Bookings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  View and manage all your car rental bookings
                </Typography>
              </Box>
            </Stack>

            {/* Stats Cards */}
            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  px: 3,
                  py: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: '12px',
                  minWidth: 140,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total Bookings
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  {customerBookings.length}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  px: 3,
                  py: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: '12px',
                  minWidth: 140,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Active
                </Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">
                  {customerBookings.filter((b) => b.status === 'ACTIVE').length}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  px: 3,
                  py: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: '12px',
                  minWidth: 140,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h5" fontWeight={700} color="grey.600">
                  {customerBookings.filter((b) => b.status === 'COMPLETED').length}
                </Typography>
              </Paper>
            </Stack>
          </Stack>

          {/* Bookings List */}
          <BookingsList bookings={customerBookings} reloadBookings={fetchCustomerBookings} onCancel={handleCancel} />
        </Stack>
      </Container>
    </Box>
  );
}

export default CustomerBookings;
