import React, { useState, useEffect } from 'react'
import { getCustomerBookings } from '../services';
import { useAuth } from '../../../shared/hooks/AuthProvider';
import BookingsList from '../components/BookingsList';

function CustomerBookings() {

    const { user } = useAuth();

    const [message, setMessage] = useState("");
    const [customerBookings, setCustomerBookings] = useState([]);
    const [error, setError] = useState("");

    const fetchCustomerBookings = async () => {
        try {
            const { data } = await getCustomerBookings(user.userId);
            console.log(data);
            setCustomerBookings(data);
        } catch (err) {
            setError(err.message);
        }
    }

    const handleCancel = (bookingId) => {
        console.log('Booking cancelled');
    }

    useEffect(() => {
        fetchCustomerBookings();
    }, [])
    

    return (
        <div>
            <BookingsList bookings={customerBookings} onCancel={handleCancel} />
        </div>
    )
}

export default CustomerBookings