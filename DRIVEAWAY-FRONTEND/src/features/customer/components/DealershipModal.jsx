import * as React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  Close as CloseIcon,
  Storefront as StorefrontIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import { submitRequest } from "../services";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 32px)",
  maxWidth: 480,
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
};

export default function DealershipModal({ open, handleClose, id, reload }) {
  const [form, setForm] = React.useState({
    dealershipName: "",
    ownerName: "",
    gstIn: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    setForm({
      dealershipName: "",
      ownerName: "",
      gstIn: "",
      phone: "",
      location: "",
    });
    setLoading(false);
  };

  const onClose = () => {
    resetState();
    handleClose();
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      user: id,
    };

    try {
      const { data } = await submitRequest(payload);
      toast.success(data || "Request submitted successfully");
      setForm({
        dealershipName: "",
        ownerName: "",
        gstIn: "",
        phone: "",
        location: "",
      });
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
      reload();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
              px: { xs: 2.5, sm: 3 },
              py: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <StorefrontIcon sx={{ color: "white", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Request Dealership
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Form body */}
          <Box sx={{ px: { xs: 2.5, sm: 3 }, py: { xs: 2.5, sm: 3 } }}>
            <Typography variant="body2" color="text.secondary" mb={2.5}>
              Fill in your dealership details below. Our team will review your
              application and get back to you.
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                label="Dealership Name"
                name="dealershipName"
                value={form.dealershipName}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. AutoMax Motors"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <StorefrontIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Owner Name"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                fullWidth
                placeholder="Full name of the owner"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="GST IN"
                name="gstIn"
                value={form.gstIn}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. 22AAAAA0000A1Z5"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ReceiptIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                placeholder="Contact number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                fullWidth
                placeholder="City or address"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon
                          sx={{ fontSize: 20, color: "text.secondary" }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Stack
                direction="row"
                justifyContent="flex-end"
                gap={1.5}
                pt={0.5}
              >
                <Button onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
