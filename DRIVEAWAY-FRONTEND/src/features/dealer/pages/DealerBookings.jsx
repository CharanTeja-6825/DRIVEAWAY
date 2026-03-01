import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { getBookings } from '../services';
import BookingsGrid from '../components/BookingsGrid';
import { CircularProgress, Stack, Box, Typography, alpha } from '@mui/material';
import { EventNote as BookingIcon } from '@mui/icons-material';
import { toast } from 'sonner';

function DealerBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const fetchBookings = async () => {
        try {
            const { data } = await getBookings(user.userId);
            if (typeof (data) === "string") toast.info(data);
            else setBookings(data);
        } catch (err) {
            toast.error(err?.message || "Failed to load bookings");
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
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

			{/* Bookings Grid */}
			<BookingsGrid 
				setLoading={setLoading}  
				bookings={bookings} 
				setMessage={(msg) => toast.success(msg)} 
				setError={(err) => toast.error(err)}
				reloadBookings={fetchBookings}
			/>
		</Box>
    )
}

export default DealerBookings