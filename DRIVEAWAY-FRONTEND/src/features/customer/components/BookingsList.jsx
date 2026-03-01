import React, { useState, useMemo } from 'react';
import { Stack, Tabs, Tab, Box, Typography } from '@mui/material';
import { useAuth } from '../../../shared/hooks/AuthProvider';
import BookingCard from './BookingCard';

export default function BookingsList({ bookings, onCancel, reloadBookings }) {
  const { statusColorMap } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Filter bookings based on selected tab
  const filteredBookings = useMemo(() => {
    if (selectedTab === 'all') return bookings;
    return bookings.filter((booking) => booking.status === selectedTab);
  }, [bookings, selectedTab]);

  // Calculate counts for each status
  const statusCounts = useMemo(() => {
    const counts = {
      all: bookings.length,
      PENDING: 0,
      APPROVED: 0,
      ACTIVE: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };

    bookings.forEach((booking) => {
      if (counts.hasOwnProperty(booking.status)) {
        counts[booking.status]++;
      }
    });

    return counts;
  }, [bookings]);

  return (
    <Stack spacing={3}>
      {/* Filter Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          borderRadius: '12px',
          px: 2,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 56,
            },
          }}
        >
          <Tab label={`All (${statusCounts.all})`} value="all" />
          <Tab label={`Pending (${statusCounts.PENDING})`} value="PENDING" />
          <Tab label={`Confirmed (${statusCounts.APPROVED})`} value="APPROVED" />
          <Tab label={`Active (${statusCounts.ACTIVE})`} value="ACTIVE" />
          <Tab label={`Completed (${statusCounts.COMPLETED})`} value="COMPLETED" />
          <Tab label={`Cancelled (${statusCounts.CANCELLED})`} value="CANCELLED" />
        </Tabs>
      </Box>

      {/* Bookings Grid */}
      {filteredBookings.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              reloadBookings={reloadBookings}
              onCancel={() => {onCancel(booking._id)}}
              statusColorMap={statusColorMap}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            bgcolor: 'background.paper',
            borderRadius: '12px',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No bookings found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedTab === 'all'
              ? 'You have no bookings yet'
              : `You have no ${selectedTab.toLowerCase()} bookings`}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

