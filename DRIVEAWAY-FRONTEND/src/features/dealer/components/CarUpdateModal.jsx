import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { updateCar } from '../services';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const CarUpdateModal = ({ open, handleClose, car, onUpdate, reloadCars }) => {
  const [formData, setFormData] = useState({
    carId : '',
    brand: '',
    model: '',
    year: '',
    pricePerDay: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (car) {
      setFormData({
        carId : car.carId || '',
        brand: car.brand || '',
        model: car.model || '',
        year: car.year || '',
        pricePerDay: car.pricePerDay || ''
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await updateCar(formData);
      setSuccess(data);
      onUpdate(data); // Update parent component with new data
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update car');
    } finally {
      setLoading(false);
      reloadCars();
      setError("");
      setSuccess("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="update-car-modal"
      aria-describedby="update-car-form"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Update Car Details
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Price Per Day"
              name="pricePerDay"
              type="number"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: '₹'
              }}
            />
            
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button 
                variant="outlined" 
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CarUpdateModal;