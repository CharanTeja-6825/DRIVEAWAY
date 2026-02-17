import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { DirectionsCar as CarIcon } from "@mui/icons-material";
import { useAuth } from '../../../shared/hooks/AuthProvider';

function CarCard({ car, onBook }) {

    const { statusColorMap } = useAuth();
    const navigate = useNavigate();

    const firstImage = car.carImages?.[0];

    const handleCardClick = () => {
        navigate(`/customer/car/${car.carId}`, { state: { car } });
    };

    return (
        <>
            <Card
                key={car.carId}
                className="hover:shadow-2xl transition-all duration-300 rounded-2xl"
                sx={{ cursor: "pointer" }}
                onClick={handleCardClick}
            >
                {/* Car Image */}
                {firstImage ? (
                    <CardMedia
                        component="img"
                        height="180"
                        image={firstImage}
                        alt={`${car.brand} ${car.model}`}
                        sx={{ height: 180, objectFit: "cover" }}
                    />
                ) : (
                    <Box
                        sx={{
                            height: 180,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.100",
                        }}
                    >
                        <CarIcon sx={{ fontSize: 64, color: "grey.300" }} />
                    </Box>
                )}

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
                            onClick={(e) => {
                                e.stopPropagation();
                                onBook(car);
                            }}
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