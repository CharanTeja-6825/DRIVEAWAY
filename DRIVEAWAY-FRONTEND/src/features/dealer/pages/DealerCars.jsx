import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Chip
} from "@mui/material";
import { getCarsByDealer } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";

export default function DealerCars() {
  const { user } = useAuth();
  const dealerId = user.userId;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      try {
        const { data } = await getCarsByDealer(dealerId);
        setCars(data);
      } catch {
        setError("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [dealerId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
        My Cars
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {cars.length === 0 ? (
        <Alert severity="info">No cars added yet</Alert>
      ) : (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid size={{ xs: 12, sm: 6, md:6 }} key={car.carId}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">
                    {car.model} {car.brand} 
                  </Typography>

                  <Typography color="text.secondary">
                    Year: {car.year}
                  </Typography>

                  <Typography color="text.secondary">
                    Year: {car.carId}
                  </Typography>

                  <Typography color="text.secondary">
                    ₹{car.pricePerDay} / day
                  </Typography>

                  <Box mt={2}>
                    <Chip
                      label={car.available ? "Available" : "Booked"}
                      color={car.available ? "success" : "error"}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
