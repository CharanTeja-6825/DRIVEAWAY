import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { getBookings } from '../services';
import BookingsGrid from '../components/BookingsGrid';
import { Alert, CircularProgress, Stack, Box, Typography, alpha } from '@mui/material';
import { EventNote as BookingIcon } from '@mui/icons-material';

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
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				minHeight="60vh"
				gap={2}
			>
				<CircularProgress size={48} thickness={4} />
				<Typography variant="body2" color="text.secondary">
					Loading bookings...
				</Typography>
			</Box>
		);
	}

    return (
        <Box
			sx={{
				p: { xs: 2, sm: 3, md: 4 },
				minHeight: "100vh",
				bgcolor: "background.default"
			}}
		>
			{/* Page Header */}
			<Box sx={{ mb: 4 }}>
				<Stack direction="row" alignItems="center" spacing={2} mb={1}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: 48,
							height: 48,
							borderRadius: 2,
							background: (theme) =>
								`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
							boxShadow: (theme) =>
								`0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
						}}
					>
						<BookingIcon sx={{ color: "white", fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							color="text.primary"
							sx={{ letterSpacing: "-0.02em" }}
						>
							My Bookings
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Manage your vehicle reservations
						</Typography>
					</Box>
				</Stack>
			</Box>

			{/* Alerts */}
			{message && (
				<Alert
					severity="success"
					sx={{
						mb: 3,
						borderRadius: 2,
						"& .MuiAlert-icon": { alignItems: "center" }
					}}
				>
					{message}
				</Alert>
			)}
			{error && (
				<Alert
					severity="error"
					sx={{
						mb: 3,
						borderRadius: 2,
						"& .MuiAlert-icon": { alignItems: "center" }
					}}
				>
					{error}
				</Alert>
			)}

			{/* Bookings Grid */}
			<BookingsGrid 
				setLoading={setLoading}  
				bookings={bookings} 
				setMessage={setMessage} 
				setError={setError}
			/>
		</Box>
    )
}

export default DealerBookings