import React, { useState } from 'react'
import {
    CircularProgress,
    Box
} from "@mui/material";
import CarCard from './CarCard';
import BookingModal from './BookingModal';



function CarsGrid({ cars, reloadCars }) {

    const [selectedCar, setSelectedCar] = useState(null);
    const [open, setOpen] = useState(false);

    const handleBook = (car) => {
        setSelectedCar(car);
        setOpen(true);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
                <CarCard key={car.carId} car={car} onBook={handleBook} />
            ))}


            {open &&
                <BookingModal setLoading={setLoading} open={open} handleClose={() => setOpen(false)} car={selectedCar} reloadCars={reloadCars} />
            }
        </div>
    )
}

export default CarsGrid