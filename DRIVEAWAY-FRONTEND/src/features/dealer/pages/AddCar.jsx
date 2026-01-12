import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack
} from "@mui/material";
import { addCar } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";

export default function AddCar() {
  const { user } = useAuth(); // dealer user
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

        <TextField
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          fullWidth
        />

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
