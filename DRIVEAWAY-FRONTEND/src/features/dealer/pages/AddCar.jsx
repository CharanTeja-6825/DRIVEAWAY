import React, { useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel
} from "@mui/material";
import { addCar } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { brandsArray } from "../../../shared/constants/brands";

export default function AddCar() {
  const { user } = useAuth();
  const dealerId = user.userId;

  const [form, setForm] = useState({
    dealerId,
    brand: "",
    model: "",
    year: "",
    pricePerDay: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Sorted once (performance-safe)
  const sortedBrands = useMemo(
    () => [...brandsArray].sort((a, b) => a.label.localeCompare(b.label)),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await addCar({
        ...form,
        year: Number(form.year),
        pricePerDay: Number(form.pricePerDay)
      });

      setSuccess("Car added successfully");
      setForm((prev) => ({
        ...prev,
        brand: "",
        model: "",
        year: "",
        pricePerDay: ""
      }));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to add car"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={420} mx="auto" mt={6} p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h6" mb={2}>
        Add Car
      </Typography>

      <Stack spacing={2}>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {/* ✅ Brand Select */}
        <FormControl fullWidth>
          <InputLabel id="brand-label">Car Brand</InputLabel>

          <Select
            labelId="brand-label"
            name="brand"
            value={form.brand}
            label="Car Brand"
            onChange={handleChange}
            renderValue={(selected) => {
              const item = sortedBrands.find(
                (b) => b.value === selected
              );
              if (!item) return "";
              return (
                <Box display="flex" alignItems="center" gap={1}>
                  <img src={item.logo} width={20} alt={item.label} />
                  {item.label}
                </Box>
              );
            }}
          >
            {sortedBrands.map((b) => (
              <MenuItem key={b.value} value={b.value}>
                <ListItemIcon>
                  <img src={b.logo} width={20} alt={b.label} />
                </ListItemIcon>
                <ListItemText primary={b.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
              year: e.target.value.replace(/\D/g, "")
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
              pricePerDay: e.target.value.replace(/\D/g, "")
            }))
          }
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Car"}
        </Button>
      </Stack>
    </Box>
  );
}
