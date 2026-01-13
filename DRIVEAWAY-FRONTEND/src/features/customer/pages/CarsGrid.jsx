import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button
} from "@mui/material";
import { getCars } from '../services'

export default function CarsGrid() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      try{
        const { data } = await getCars();
        console.log(data);
        setCars(data);
      }catch(err){
        setError(err.message);
      }
    }
    loadCars();
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Available Cars
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card
            key={car.carId}
            className="hover:shadow-xl transition-shadow duration-300"
          >
            <CardContent className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex justify-between items-start">
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
                Model: <span className="font-medium">{car.model}</span>
              </Typography>

              {/* Year */}
              <Typography className="text-gray-600">
                Year: {car.year}
              </Typography>

              {/* Dealer */}
              <Typography className="text-gray-600">
                Dealer: {car.dealerShipName}
              </Typography>

              {/* Price */}
              <div className="flex justify-between items-center mt-3">
                <Typography className="text-lg font-semibold text-indigo-600">
                  ₹{car.pricePerDay} / day
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  disabled={!car.available}
                >
                  Book
                </Button>
              </div>

              {/* Footer */}
              <Typography className="text-xs text-gray-400 mt-2">
                Added on{" "}
                {new Date(car.createdAt).toLocaleDateString("en-IN")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
