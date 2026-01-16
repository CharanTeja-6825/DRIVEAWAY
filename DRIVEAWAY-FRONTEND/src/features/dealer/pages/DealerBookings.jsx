import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { getBookings } from '../services';
import BookingsGrid from '../components/BookingsGrid';

function DealerBookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    const { user } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try{
                const  { data } = await getBookings(user.userId);
                setBookings(data);
            }catch(err){
                setError(err);
            }
        }
        fetchBookings();
    }, [])

    console.log(bookings);

    return (
    <div>
        <BookingsGrid bookings={bookings} />
    </div>
  )
}

export default DealerBookings