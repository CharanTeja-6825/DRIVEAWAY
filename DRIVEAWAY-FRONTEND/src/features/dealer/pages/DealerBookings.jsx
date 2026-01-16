import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { getBookings } from '../services';
import BookingsGrid from '../components/BookingsGrid';
import { SetMealSharp } from '@mui/icons-material';
import { Alert } from '@mui/material';

function DealerBookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await getBookings(user.userId);
                if (typeof (data) === "string") setMessage(data);
                setBookings(data);
            } catch (err) {
                setError(err);
            }
        }
        fetchBookings();
    }, [])


    return (
        <div>
            {
                message || error ? (
                    <div className='flex gap-5 justify-center items-center mt-5'>
                        {message && <Alert severity='info'>{message}</Alert>}
                        {error && <Alert variant='error'>{error}</Alert>}
                    </div>
                ) :
                    (
                        <BookingsGrid setMessage={setMessage} setError={setError} bookings={bookings} />
                    )
            }

        </div>
    )
}

export default DealerBookings