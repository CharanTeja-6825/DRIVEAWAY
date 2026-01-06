import * as React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function DealershipModal({ open, handleClose }) {
  const [form, setForm] = React.useState({
    dealershipName: "",
    ownerName: "",
    gstIn: "",
    phone: "",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = () => {
    console.log(form);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          add dealership
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Dealership Name"
          name="dealershipName"
          value={form.dealershipName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Owner Name"
          name="ownerName"
          value={form.ownerName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="GST In"
          name="gstIn"
          value={form.gstIn}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose}>cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}