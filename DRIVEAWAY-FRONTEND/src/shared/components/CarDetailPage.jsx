import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  alpha,
  IconButton,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  CalendarMonth as YearIcon,
  CurrencyRupee as PriceIcon,
  DirectionsCar as CarIcon,
  StorefrontOutlined as DealerIcon,
  ChevronLeft,
  ChevronRight,
  Star,
} from "@mui/icons-material";
import { useAuth } from "../hooks/AuthProvider";
import { brandsArray } from "../constants/brands";
import BookingModal from "../../features/customer/components/BookingModal";
import ReviewsList from "./ReviewsList";
import StarRating from "./StarRating";
import { getCarReviews } from "../../features/customer/services";

const getBrandLogo = (brand) =>
  brandsArray.find((b) => b.value === brand)?.logo;

export default function CarDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, statusColorMap } = useAuth();
  const car = location.state?.car;

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Fetch reviews for this car
  useEffect(() => {
    if (car?._id) {
      setReviewsLoading(true);
      getCarReviews(car._id)
        .then((res) => {
          setReviews(res.data || []);
        })
        .catch((err) => {
          console.error("Failed to fetch reviews:", err);
          setReviews([]);
        })
        .finally(() => {
          setReviewsLoading(false);
        });
    }
  }, [car?._id]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  if (!car) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        gap={2}
      >
        <CarIcon sx={{ fontSize: 64, color: "text.disabled" }} />
        <Typography variant="h6" color="text.secondary">
          Car not found
        </Typography>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const images = car.carImages?.length > 0 ? car.carImages : [];
  const isCustomer = user?.role === "CUSTOMER";
  const brandLogo = getBrandLogo(car.brand);

  const handleGoBack = () => navigate(-1);

  const reloadCars = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pb: 6,
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: 2,
        }}
      >
        <Button
          startIcon={<BackIcon />}
          onClick={handleGoBack}
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          Back
        </Button>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 5 },
          }}
        >
          {/* Left: Image Carousel */}
          <Box sx={{ flex: { md: "1 1 55%" }, minWidth: 0 }}>
            {images.length > 0 ? (
              <Box>
                {/* Main carousel */}
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    bgcolor: "grey.100",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
                    <Box sx={{ display: "flex" }}>
                      {images.map((src, index) => (
                        <Box
                          key={index}
                          sx={{
                            flex: "0 0 100%",
                            minWidth: 0,
                            position: "relative",
                            aspectRatio: "4 / 3",
                          }}
                        >
                          <Box
                            component="img"
                            src={src}
                            alt={`${car.brand} ${car.model} - View ${index + 1}`}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <IconButton
                        onClick={scrollPrev}
                        sx={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          bgcolor: "rgba(255,255,255,0.9)",
                          boxShadow: 2,
                          "&:hover": { bgcolor: "white" },
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                      <IconButton
                        onClick={scrollNext}
                        sx={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          bgcolor: "rgba(255,255,255,0.9)",
                          boxShadow: 2,
                          "&:hover": { bgcolor: "white" },
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}
                </Box>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      mt: 2,
                      justifyContent: "center",
                    }}
                  >
                    {images.map((src, index) => (
                      <Box
                        key={index}
                        onClick={() => scrollTo(index)}
                        sx={{
                          width: 72,
                          height: 54,
                          borderRadius: 2,
                          overflow: "hidden",
                          cursor: "pointer",
                          border: "2px solid",
                          borderColor:
                            selectedIndex === index
                              ? "primary.main"
                              : "divider",
                          opacity: selectedIndex === index ? 1 : 0.6,
                          transition: "all 0.2s ease",
                          "&:hover": { opacity: 1, borderColor: "primary.light" },
                        }}
                      >
                        <Box
                          component="img"
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  aspectRatio: "4 / 3",
                  borderRadius: 4,
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CarIcon sx={{ fontSize: 80, color: "grey.300" }} />
              </Box>
            )}
          </Box>

          {/* Right: Car Details */}
          <Box sx={{ flex: { md: "1 1 45%" } }}>
            {/* Brand & Model Header */}
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              {brandLogo && (
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <img
                    src={brandLogo}
                    alt={car.brand}
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
                >
                  {car.brand} {car.model}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Typography variant="body2" color="text.secondary">
                    {car.year}
                  </Typography>
                  {car.rating > 0 && (
                    <>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          bgcolor: "text.disabled",
                        }}
                      />
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Star sx={{ fontSize: 16, color: "#fbbf24" }} />
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="text.primary"
                        >
                          {car.rating?.toFixed(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({car.totalRatingsCount || 0}{" "}
                          {car.totalRatingsCount === 1 ? "review" : "reviews"})
                        </Typography>
                      </Stack>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>

            {/* Status */}
            <Box sx={{ mt: 2, mb: 3 }}>
              <Chip
                label={car.carStatus}
                size="small"
                sx={{
                  bgcolor: statusColorMap[car.carStatus],
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Details */}
            <Stack spacing={2.5}>
              <DetailItem
                icon={<CarIcon />}
                label="Brand"
                value={car.brand}
              />
              <DetailItem
                icon={<YearIcon />}
                label="Year"
                value={car.year}
              />
              {car.dealerShipName && (
                <DetailItem
                  icon={<DealerIcon />}
                  label="Dealership"
                  value={car.dealerShipName}
                />
              )}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Price */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, 0.06),
                border: "1px solid",
                borderColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.15),
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Price per day
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary.main"
                sx={{ letterSpacing: "-0.02em" }}
              >
                ₹{car.pricePerDay?.toLocaleString("en-IN")}
              </Typography>
            </Box>

            {/* Book Button (Customer Only) */}
            {isCustomer && (
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={car.carStatus !== "AVAILABLE"}
                onClick={() => setBookingOpen(true)}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 700,
                  borderRadius: 3,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: (theme) =>
                    `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                }}
              >
                {car.carStatus === "AVAILABLE"
                  ? "Book This Car"
                  : "Currently Unavailable"}
              </Button>
            )}

            {/* Footer info */}
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", mt: 2 }}
            >
              Listed on{" "}
              {new Date(car.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Box>

        {/* Reviews Section */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 4 }} />
          <ReviewsList
            reviews={reviews}
            loading={reviewsLoading}
            averageRating={car.rating || 0}
            totalCount={car.totalRatingsCount || 0}
          />
        </Box>
      </Box>

      {/* Booking Modal */}
      {isCustomer && (
        <BookingModal
          open={bookingOpen}
          handleClose={() => setBookingOpen(false)}
          car={car}
          reloadCars={reloadCars}
        />
      )}
    </Box>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", lineHeight: 1.2 }}
        >
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={600} color="text.primary">
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}
