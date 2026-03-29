import React from "react";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";

/**
 * StarRating Component
 * @param {number} rating - Current rating value (0-5)
 * @param {function} onRatingChange - Callback when rating changes (for interactive mode)
 * @param {boolean} readOnly - Whether the rating is read-only
 * @param {string} size - Size of stars: "small", "medium", "large"
 * @param {boolean} showValue - Whether to show the numeric value
 * @param {number} totalReviews - Optional total reviews count to display
 */
export default function StarRating({
  rating = 0,
  onRatingChange,
  readOnly = false,
  size = "medium",
  showValue = false,
  totalReviews,
}) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeMap = {
    small: { fontSize: 18, spacing: 0.25 },
    medium: { fontSize: 24, spacing: 0.5 },
    large: { fontSize: 32, spacing: 0.75 },
  };

  const { fontSize, spacing } = sizeMap[size] || sizeMap.medium;

  const handleClick = (value) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readOnly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  const renderStar = (index) => {
    const value = index + 1;
    const filled = displayRating >= value;
    const halfFilled = displayRating >= value - 0.5 && displayRating < value;

    const StarIcon = filled
      ? Star
      : halfFilled
      ? StarHalf
      : StarBorder;

    const starColor = filled || halfFilled ? "#fbbf24" : "#d1d5db";

    if (readOnly) {
      return (
        <StarIcon
          key={index}
          sx={{
            fontSize,
            color: starColor,
            transition: "color 0.2s ease",
          }}
        />
      );
    }

    return (
      <IconButton
        key={index}
        size="small"
        onClick={() => handleClick(value)}
        onMouseEnter={() => handleMouseEnter(value)}
        onMouseLeave={handleMouseLeave}
        sx={{
          p: 0.25,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <StarIcon
          sx={{
            fontSize,
            color: starColor,
            transition: "all 0.2s ease",
            transform: hoverRating === value ? "scale(1.2)" : "scale(1)",
          }}
        />
      </IconButton>
    );
  };

  return (
    <Stack direction="row" alignItems="center" spacing={spacing}>
      <Box sx={{ display: "flex", alignItems: "center", gap: spacing / 2 }}>
        {[0, 1, 2, 3, 4].map(renderStar)}
      </Box>
      {showValue && (
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.secondary"
          sx={{ ml: 0.5 }}
        >
          {rating.toFixed(1)}
        </Typography>
      )}
      {totalReviews !== undefined && (
        <Typography variant="body2" color="text.secondary">
          ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
        </Typography>
      )}
    </Stack>
  );
}
