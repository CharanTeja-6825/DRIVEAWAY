import React, { useState, useEffect } from 'react'
import { getCustomerBookings } from '../services';
import { useAuth } from '../../../shared/hooks/AuthProvider';
import BookingsList from '../components/BookingsList';
import { CircularProgress } from '@mui/material';

function CustomerBookings() {

    const { user } = useAuth();

    const [message, setMessage] = useState("");
    const [customerBookings, setCustomerBookings] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCustomerBookings = async () => {
        try {
            const { data } = await getCustomerBookings(user.userId);
            console.log(data);
            setCustomerBookings(data);
        } catch (err) {
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }

    const handleCancel = (bookingId) => {
        console.log('Booking cancelled', bookingId);
    }

    useEffect(() => {
        fetchCustomerBookings();
    }, [])

    if(loading){
        return(
            <div className='flex justify-center mt-10 items-center'>
                <CircularProgress enableTrackSlot size={"3rem"} />
            </div>
        )
    }
    

    return (
        <div>
            <BookingsList bookings={customerBookings} onCancel={handleCancel} />
        </div>
    )
}

export default CustomerBookings