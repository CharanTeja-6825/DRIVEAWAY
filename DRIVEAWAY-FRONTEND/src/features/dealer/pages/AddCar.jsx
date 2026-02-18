import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  IconButton,
} from "@mui/material";
import {
  CloudUpload,
  ChevronLeft,
  ChevronRight,
  ImageNotSupported,
} from "@mui/icons-material";
import { toast } from "sonner";
import { addCar } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import BrandSelection from "../components/BrandSelection";

export default function AddCar() {
  const { user } = useAuth();
  const dealerId = user.userId;

  const [form, setForm] = useState({
    dealerId,
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    registration: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!imageFiles.length) {
      setPreviewUrls([]);
      setActiveImageIndex(0);
      return undefined;
    }

    const urls = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPreviewUrls(urls);
    setActiveImageIndex((prev) => (prev < urls.length ? prev : 0));

    return () => {
      urls.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [imageFiles]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    if (!imageFiles.length) {
      setActiveImageIndex(0);
    }

    setImageFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const handlePrevImage = () => {
    if (previewUrls.length < 2) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? previewUrls.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (previewUrls.length < 2) return;
    setActiveImageIndex((prev) =>
      prev === previewUrls.length - 1 ? 0 : prev + 1,
    );
  };

  const handleSubmit = async () => {
    if (!imageFiles.length) {
      toast.error("Please upload at least one car image");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();

      const carData = {
        dealerId: form.dealerId,
        brand: form.brand,
        model: form.model,
        year: Number(form.year),
        pricePerDay: Number(form.pricePerDay),
        registration: form.registration,
      };
      // payload.append("dealerId", String(form.dealerId));
      // payload.append("brand", form.brand);
      // payload.append("model", form.model);
      // payload.append("year", String(Number(form.year)));
      // payload.append("pricePerDay", String(Number(form.pricePerDay)));
      // payload.append("registration", form.registration);
      payload.append(
        "car",
        new Blob([JSON.stringify(carData)], {
          type: "application/json",
        }),
      );
      imageFiles.forEach((file) => payload.append("images", file));

      await addCar(payload);

      toast.success("Car added successfully");
      setForm({
        dealerId,
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        registration: "",
      });
      setImageFiles([]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to add car",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={520} mx="auto" mt={6} p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h6" mb={2}>
        Add Car
      </Typography>

      <Stack spacing={2}>
        <BrandSelection form={form} handleChange={handleChange} />

        <TextField
          label="Model"
          name="model"
          value={form.model}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Year"
          name="year"
          value={form.year}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              year: e.target.value.replace(/\D/g, ""),
            }))
          }
          inputProps={{ maxLength: 4 }}
          fullWidth
        />

        <TextField
          label="Price Per Day"
          name="pricePerDay"
          value={form.pricePerDay}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              pricePerDay: e.target.value.replace(/\D/g, ""),
            }))
          }
          fullWidth
        />

        <TextField
          label="Car Registration Number"
          name="registration"
          value={form.registration}
          onChange={handleChange}
          fullWidth
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Car Images
          </Typography>

          <Stack spacing={1}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              disabled={loading}
            >
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </Button>

            <Typography variant="caption" color="text.secondary">
              Add multiple angles to help customers preview the car before
              booking.
            </Typography>

            <Card sx={{ position: "relative", height: 240, borderRadius: 2 }}>
              {previewUrls.length ? (
                <Box
                  component="img"
                  src={previewUrls[activeImageIndex]?.url}
                  alt={previewUrls[activeImageIndex]?.name || "Car preview"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              ) : (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  <ImageNotSupported color="disabled" fontSize="large" />
                  <Typography variant="body2" color="text.secondary">
                    Image previews will appear here
                  </Typography>
                </Stack>
              )}

              {previewUrls.length > 1 && (
                <>
                  <IconButton
                    size="small"
                    onClick={handlePrevImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 12,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.85)",
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={handleNextImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 12,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255,255,255,0.85)",
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}
            </Card>

            {previewUrls.length > 0 && (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" noWrap>
                  {previewUrls[activeImageIndex]?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {activeImageIndex + 1} / {previewUrls.length}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Add Car"}
        </Button>
      </Stack>
    </Box>
  );
}
