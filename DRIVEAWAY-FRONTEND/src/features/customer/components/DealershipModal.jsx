import * as React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack
} from "@mui/material";
import { submitRequest } from "../services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const initialForm = {
  dealershipName: "",
  ownerName: "",
  gstIn: "",
  phone: "",
  location: ""
};

export default function DealershipModal({ open, handleClose }) {
  const [form, setForm] = React.useState(initialForm);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    setForm(initialForm);
    setSuccess("");
    setError("");
    setLoading(false);
  };

  const onClose = () => {
    resetState();
    handleClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await submitRequest(form);
      setSuccess("Request submitted successfully");
      setForm(initialForm);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Request Dealership
        </Typography>

        <Stack spacing={2}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Dealership Name"
            name="dealershipName"
            value={form.dealershipName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Owner Name"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="GST IN"
            name="gstIn"
            value={form.gstIn}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
          />

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}