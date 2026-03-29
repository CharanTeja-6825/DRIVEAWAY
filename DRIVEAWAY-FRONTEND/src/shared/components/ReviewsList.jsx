import React from "react";
import {
  Box,
  Typography,
  Stack,
  Skeleton,
  Divider,
  alpha,
} from "@mui/material";
import { RateReview } from "@mui/icons-material";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";

/**
 * ReviewsList Component
 * Displays a list of reviews with summary stats
 */
export default function ReviewsList({
  reviews = [],
  loading = false,
  averageRating = 0,
  totalCount = 0,
  title = "Customer Reviews",
}) {
  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2, mb: 2 }} />
        <Stack spacing={2}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      </Box>
    );
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.starRating === stars).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.starRating === stars).length / reviews.length) * 100
        : 0,
  }));

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RateReview sx={{ color: "primary.main", fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalCount} {totalCount === 1 ? "review" : "reviews"} from verified customers
          </Typography>
        </Box>
      </Stack>

      {reviews.length > 0 ? (
        <>
          {/* Rating Summary */}
          <Box
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              {/* Overall Rating */}
              <Box sx={{ textAlign: { xs: "left", sm: "center" }, minWidth: 120 }}>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  color="primary.main"
                  sx={{ lineHeight: 1 }}
                >
                  {averageRating.toFixed(1)}
                </Typography>
                <StarRating rating={averageRating} readOnly size="small" />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                  {totalCount} {totalCount === 1 ? "rating" : "ratings"}
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />

              {/* Rating Distribution */}
              <Box sx={{ flex: 1, width: "100%" }}>
                {ratingDistribution.map(({ stars, count, percentage }) => (
                  <Stack
                    key={stars}
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ mb: 0.75 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 50 }}
                    >
                      {stars} star
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "grey.200",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${percentage}%`,
                          borderRadius: 4,
                          bgcolor: stars >= 4 ? "#16a34a" : stars >= 3 ? "#f59e0b" : "#dc2626",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ minWidth: 30, textAlign: "right" }}
                    >
                      {count}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>

          {/* Reviews List */}
          <Stack spacing={2}>
            {reviews.map((review, index) => (
              <ReviewCard key={review.reviewId || review._id || index} review={review} />
            ))}
          </Stack>
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            px: 3,
            borderRadius: 3,
            bgcolor: "grey.50",
            border: "1px dashed",
            borderColor: "grey.300",
          }}
        >
          <RateReview sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Reviews Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Be the first to share your experience with this car!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
