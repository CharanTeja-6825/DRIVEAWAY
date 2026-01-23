import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import { useAuth } from '../../../shared/hooks/AuthProvider';

function CarCard({ car, onBook }) {

    const { statusColorMap } = useAuth();

    return (
        <>
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
                            label={car.carStatus}
                            sx={{backgroundColor : statusColorMap[car.carStatus], color:"white"}}
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
                            disabled={car.carStatus !== "AVAILABLE"}
                            className="!rounded-full"
                            onClick={() => onBook(car)}
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
        </>
    )
}

export default CarCard