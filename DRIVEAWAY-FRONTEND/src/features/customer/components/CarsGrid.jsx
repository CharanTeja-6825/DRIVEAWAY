import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import CarCard from './CarCard';
import BookingModal from './BookingModal';



function CarsGrid({ cars }) {

    const [selectedCar, setSelectedCar] = useState(null);
    const [open, setOpen] = useState(false);

    const handleBook = (car) => {
        setSelectedCar(car);
        setOpen(true);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
                <CarCard key={car.carId} car={car} onBook={handleBook}/>
            ))}


            {open && 
                <BookingModal open={open} handleClose={() => setOpen(false)} car={selectedCar}/>
            }
        </div>



    )
}

export default CarsGrid