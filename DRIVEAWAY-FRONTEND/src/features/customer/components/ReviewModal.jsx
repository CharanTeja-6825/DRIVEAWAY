import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
  alpha,
} from "@mui/material";
import { Close, Star, StarBorder, RateReview } from "@mui/icons-material";
import { toast } from "sonner";
import { submitReview } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";

/**
 * ReviewModal Component
 * Modal for submitting a review for a completed booking
 */
export default function ReviewModal({
  open,
  onClose,
  booking,
  onReviewSubmitted,
}) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = {
        bookingId: booking._id,
        carId: booking.carId,
        customerId: user.userId,
        review: review.trim(),
        starRating: rating,
      };

      await submitReview(reviewData);
      toast.success("Thank you for your review! 🎉");
      onReviewSubmitted?.();
      handleClose();
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error(error.response?.data || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setReview("");
    onClose();
  };

  const displayRating = hoverRating || rating;

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          color: "white",
          p: 3,
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <Close />
        </IconButton>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RateReview sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Share Your Experience
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {booking?.carBrand} {booking?.carModel}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {/* Star Rating */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            How was your experience?
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ mb: 1 }}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <IconButton
                key={value}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                sx={{
                  transition: "all 0.2s ease",
                  transform: displayRating >= value ? "scale(1.1)" : "scale(1)",
                  "&:hover": {
                    bgcolor: "transparent",
                    transform: "scale(1.2)",
                  },
                }}
              >
                {displayRating >= value ? (
                  <Star
                    sx={{
                      fontSize: 40,
                      color: "#fbbf24",
                      filter: "drop-shadow(0 2px 4px rgba(251,191,36,0.4))",
                    }}
                  />
                ) : (
                  <StarBorder
                    sx={{
                      fontSize: 40,
                      color: "#d1d5db",
                    }}
                  />
                )}
              </IconButton>
            ))}
          </Stack>
          <Typography
            variant="body1"
            fontWeight={600}
            color={displayRating ? "primary.main" : "text.secondary"}
            sx={{ minHeight: 24 }}
          >
            {displayRating ? ratingLabels[displayRating] : "Tap to rate"}
          </Typography>
        </Box>

        {/* Review Text */}
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            Write a review (optional)
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Share details of your experience with this car..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            Your review helps other customers make better decisions
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={rating === 0 || submitting}
          sx={{
            borderRadius: 2,
            px: 4,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
            },
          }}
        >
          {submitting ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Submit Review"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
