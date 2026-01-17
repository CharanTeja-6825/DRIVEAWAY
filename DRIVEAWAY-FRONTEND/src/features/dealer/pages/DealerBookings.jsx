import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { getBookings } from '../services';
import BookingsGrid from '../components/BookingsGrid';
import { Alert, CircularProgress, Stack, Box } from '@mui/material';

function DealerBookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await getBookings(user.userId);
                if (typeof (data) === "string") setMessage(data);
                else setBookings(data);
            } catch (err) {
                setError(err);
            } finally{
                setLoading(false);
            }
        }
        fetchBookings();
    }, [])

    if (loading) {
		return (
			<Box display="flex" justifyContent="center" mt={10}>
				<CircularProgress />
			</Box>
		);
	}

    return (
        <div>
            {
                <Stack>
                    {message && <Alert severity='success'>{message}</Alert>}
                    {error && <Alert severity='error'>{error}</Alert>}
                    <BookingsGrid setLoading={setLoading}  bookings={bookings} setMessage={setMessage} setError={setError}/>
                </Stack>

            }
        </div>
    )
}

export default DealerBookings