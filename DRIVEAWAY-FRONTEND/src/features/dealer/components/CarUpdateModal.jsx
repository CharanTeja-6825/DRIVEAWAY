import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Close, CloudUpload, Delete } from '@mui/icons-material';
import { toast } from 'sonner';
import { updateCar } from '../services';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const CarUpdateModal = ({ open, handleClose, car, onUpdate, reloadCars }) => {
  const [formData, setFormData] = useState({
    carId: '',
    brand: '',
    model: '',
    year: '',
    pricePerDay: ''
  });
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (car) {
      setFormData({
        carId: car.carId || '',
        brand: car.brand || '',
        model: car.model || '',
        year: car.year || '',
        pricePerDay: car.pricePerDay || ''
      });
      setNewImages([]);
      setImagePreviews(car.carImages || []);
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    // Revoke previous blob URLs to avoid memory leaks
    if (newImages.length > 0) {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    }
    setNewImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeNewImages = () => {
    // Revoke blob URLs before clearing
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setNewImages([]);
    setImagePreviews(car?.carImages || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('car', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
      if (newImages.length > 0) {
        newImages.forEach(img => payload.append('images', img));
      }

      const { data } = await updateCar(payload);
      toast.success(typeof data === 'string' ? data : 'Car updated successfully');
      if (onUpdate) onUpdate(data);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update car');
    } finally {
      setLoading(false);
      reloadCars();
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
        <Typography variant="h6" component="h2" mb={2} fontWeight={700}>
          Update Car Details
        </Typography>

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

            {/* Image Upload Section */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                Car Images
              </Typography>

              {/* Current/Preview Images */}
              {imagePreviews.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
                  {imagePreviews.map((img, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 80,
                        height: 60,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        border: '2px solid',
                        borderColor: newImages.length > 0 ? 'primary.main' : 'grey.200',
                      }}
                    >
                      <img
                        src={img}
                        alt={`Car ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                  {newImages.length > 0 && (
                    <IconButton size="small" onClick={removeNewImages} color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              )}

              {/* Upload Button */}
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                size="small"
                fullWidth
                sx={{ borderStyle: 'dashed' }}
              >
                {newImages.length > 0 ? `${newImages.length} new image(s) selected` : 'Upload New Images'}
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Upload new images to replace existing ones
              </Typography>
            </Box>

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
