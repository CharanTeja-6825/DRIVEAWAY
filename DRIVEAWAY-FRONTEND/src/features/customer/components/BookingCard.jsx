import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import {
  EventNote,
  LocationOn,
  Phone,
  DirectionsCar,
  CalendarToday,
  Cancel,
  Store,
  RateReview,
  CheckCircle,
} from "@mui/icons-material";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PaymentButton from "./Payment";
import ReviewModal from "./ReviewModal";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { hasReviewedBooking } from "../services";

const statusBadgeVariant = {
  PENDING: "warning",
  APPROVED: "info",
  ACTIVE: "success",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
  REJECTED: "destructive",
  EXPIRED: "secondary",
  PAID: "success",
};

export default function BookingCard({ booking, onCancel, statusColorMap, reloadBookings }) {

  const {getStatusLabel} = useAuth();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [checkingReview, setCheckingReview] = useState(false);

  const isCompleted = (booking?.status || "").toUpperCase() === "COMPLETED";

  // Check if user has already reviewed this booking
  useEffect(() => {
    if (isCompleted && booking?._id) {
      setCheckingReview(true);
      hasReviewedBooking(booking._id)
        .then((res) => {
          setHasReviewed(res.data === true);
        })
        .catch(() => {
          setHasReviewed(false);
        })
        .finally(() => {
          setCheckingReview(false);
        });
    }
  }, [isCompleted, booking?._id]);

  const handleReviewSubmitted = () => {
    setHasReviewed(true);
    reloadBookings?.();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isBookingApproved =
    (booking?.status || "").toUpperCase() === "APPROVED";

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: "6px",
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                #{booking._id.slice(-6).toUpperCase()}
              </Typography>
            </Box>
            <Badge
              variant={statusBadgeVariant[booking.status] || "default"}
              className="text-[11px]"
            >
              {getStatusLabel(booking.status)}
            </Badge>
          </Stack>

          {isBookingApproved && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <IconButton
                  size="small"
                  sx={{
                    color: "error.main",
                    "&:hover": {
                      bgcolor: "error.lighter",
                    },
                  }}
                >
                  <Cancel fontSize="small" />
                </IconButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel this booking? This action
                    cannot be undone. The car will be made available for other
                    customers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onCancel(booking.bookingId)}>
                    Yes, Cancel Booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Dealership Info */}
        <Stack spacing={1.5} mb={2}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Store sx={{ fontSize: 18, color: "primary.main", mt: 0.2 }} />
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Dealership
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {booking.dealershipName}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="flex-start">
            <LocationOn sx={{ fontSize: 18, color: "grey.500", mt: 0.2 }} />
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Location
              </Typography>
              <Typography variant="body2">{booking.dealerLocation}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Phone sx={{ fontSize: 18, color: "grey.500", mt: 0.2 }} />
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Contact
              </Typography>
              <Typography variant="body2">{booking.dealerPhone}</Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Vehicle Info */}
        <Stack spacing={1.5} mb={2}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <DirectionsCar
              sx={{ fontSize: 18, color: "primary.main", mt: 0.2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Vehicle
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {booking.carBrand} {booking.carModel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {booking.carYear}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Booking Dates */}
        <Stack direction="row" spacing={2} mb={2}>
          <Stack direction="row" spacing={1} alignItems="center" flex={1}>
            <CalendarToday sx={{ fontSize: 16, color: "grey.500" }} />
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                From
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatDate(booking.startDate)}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" flex={1}>
            <EventNote sx={{ fontSize: 16, color: "grey.500" }} />
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                To
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatDate(booking.endDate)}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Total Amount */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            Total Amount
          </Typography>
          <Typography
            variant="h6"
            color="primary.main"
            fontWeight={700}
          ></Typography>
          {!isBookingApproved && <p className="font-bold">₹ {booking.totalAmount}</p>}
          {isBookingApproved && <PaymentButton reloadBookings={reloadBookings} booking={booking} />}
        </Stack>

        {/* Write Review Button - Only for COMPLETED bookings */}
        {isCompleted && !checkingReview && (
          <>
            <Divider sx={{ my: 2 }} />
            {hasReviewed ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{
                  py: 1.5,
                  px: 2,
                  bgcolor: "success.lighter",
                  borderRadius: 2,
                }}
              >
                <CheckCircle sx={{ fontSize: 20, color: "success.main" }} />
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  Review Submitted
                </Typography>
              </Stack>
            ) : (
              <Button
                variant="contained"
                fullWidth
                startIcon={<RateReview />}
                onClick={() => setReviewModalOpen(true)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  },
                }}
              >
                Write a Review
              </Button>
            )}
          </>
        )}
      </CardContent>

      {/* Review Modal */}
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        booking={booking}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </Card>
  );
}
