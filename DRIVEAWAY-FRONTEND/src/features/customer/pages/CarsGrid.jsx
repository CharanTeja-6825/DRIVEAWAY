import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import { getCars } from "../services";

export default function CarsGrid() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getCars();
        setCars(data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load cars"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  /* 🔄 Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <CircularProgress />
      </div>
    );
  }

  /* ❌ Error */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Available Cars
      </h1>

      {cars.length === 0 ? (
        <div className="flex justify-center">
          <Alert severity="info">No cars available</Alert>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Card
              key={car.carId}
              className="hover:shadow-2xl transition-all duration-300 rounded-2xl"
            >
              <CardContent className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <Typography variant="h6" className="font-bold">
                    {car.brand}
                  </Typography>

                  <Chip
                    label={car.available ? "Available" : "Booked"}
                    color={car.available ? "success" : "error"}
                    size="small"
                  />
                </div>

                {/* Model */}
                <Typography className="text-gray-600">
                  Model:{" "}
                  <span className="font-semibold">{car.model}</span>
                </Typography>

                {/* Year */}
                <Typography className="text-gray-600">
                  Year: {car.year}
                </Typography>

                {/* Dealer */}
                <Typography className="text-gray-600 truncate">
                  Dealer: {car.dealerShipName}
                </Typography>

                {/* Price */}
                <div className="flex justify-between items-center mt-2">
                  <Typography className="text-lg font-bold text-indigo-600">
                    ₹{car.pricePerDay} / day
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    disabled={!car.available}
                    className="!rounded-full"
                  >
                    Book
                  </Button>
                </div>

                {/* Footer */}
                <Typography className="text-xs text-gray-400">
                  Added on{" "}
                  {new Date(car.createdAt).toLocaleDateString("en-IN")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
