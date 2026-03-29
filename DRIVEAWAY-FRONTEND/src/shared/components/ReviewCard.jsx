import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  alpha,
} from "@mui/material";
import { FormatQuote, Verified } from "@mui/icons-material";
import StarRating from "./StarRating";

/**
 * ReviewCard Component
 * Displays a single review with customer info and star rating
 */
export default function ReviewCard({ review }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: (theme) =>
            `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with customer info */}
        <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
          <Avatar
            src={review.customerProfileUrl}
            alt={review.customerName}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "primary.main",
              fontSize: "1rem",
            }}
          >
            {getInitials(review.customerName)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {review.customerName || "Anonymous"}
              </Typography>
              <Verified
                sx={{ fontSize: 16, color: "primary.main" }}
                titleAccess="Verified Purchase"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {formatDate(review.createdAt)}
            </Typography>
          </Box>
          <Box>
            <StarRating rating={review.starRating} readOnly size="small" />
          </Box>
        </Stack>

        {/* Review content */}
        <Box
          sx={{
            position: "relative",
            pl: 3,
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <FormatQuote
            sx={{
              position: "absolute",
              left: -8,
              top: -8,
              fontSize: 32,
              color: (theme) => alpha(theme.palette.primary.main, 0.15),
              transform: "rotate(180deg)",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            {review.review || "No written review provided."}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
