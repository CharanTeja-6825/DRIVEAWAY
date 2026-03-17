import React, { useEffect, useState } from 'react';
import {
	Box,
	Grid,
	Card,
	CardContent,
	Typography,
	Button,
	Stack,
	Chip,
	CircularProgress,
	alpha,
	Divider,
	Avatar
} from '@mui/material';
import {
	DirectionsCar as CarIcon,
	EventNote as BookingIcon,
	TrendingUp as TrendingIcon,
	CheckCircle as CheckIcon,
	Schedule as ScheduleIcon,
	Cancel as CancelIcon,
	ArrowForward as ArrowIcon,
	Dashboard as DashboardIcon
} from '@mui/icons-material';
import { toast } from 'sonner';
import { useAuth } from '../../../shared/hooks/AuthProvider';
import { getCustomerBookings, getCars } from '../services';
import { useNavigate } from 'react-router-dom';

function CustomerHome() {
	const { user, statusColorMap } = useAuth();
	const navigate = useNavigate();
	const [bookings, setBookings] = useState([]);
	const [stats, setStats] = useState({
		total: 0,
		upcoming: 0,
		completed: 0,
		cancelled: 0
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getCustomerBookings(user.userId);
				if (typeof data === 'string') {
					setBookings([]);
				} else {
          
					setBookings(data);
					// Calculate stats
					const total = data.length;
					const upcoming = data.filter(b => 
						b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'PENDING'
					).length;
					const completed = data.filter(b => b.bookingStatus === 'COMPLETED').length;
					const cancelled = data.filter(b => b.bookingStatus === 'CANCELLED').length;
					
					setStats({ total, upcoming, completed, cancelled });
				}
			} catch (err) {
				toast.error('Failed to load dashboard data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [user.userId]);

	// Get upcoming bookings (next 3)
	const upcomingBookings = bookings
		.filter(b => b.status === 'APPROVED' || b.status === 'PENDING')
		.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
		.slice(0, 3);

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
					Loading dashboard...
				</Typography>
			</Box>
		);
	}

	const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
		<Card
			elevation={0}
			sx={{
				height: '100%',
				borderRadius: 3,
				border: '1px solid',
				borderColor: 'divider',
				transition: 'all 0.3s ease',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
					borderColor: color
				}
			}}
		>
			<CardContent sx={{ p: 3 }}>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
					<Box>
						<Typography variant="body2" color="text.secondary" gutterBottom>
							{title}
						</Typography>
						<Typography variant="h3" fontWeight={700} color={color}>
							{value}
						</Typography>
					</Box>
					<Box
						sx={{
							width: 56,
							height: 56,
							borderRadius: 2,
							bgcolor: bgColor,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Icon sx={{ fontSize: 28, color }} />
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);

	const QuickActionCard = ({ icon: Icon, title, description, onClick, color }) => (
		<Card
			elevation={0}
			sx={{
				height: '100%',
				borderRadius: 3,
				border: '1px solid',
				borderColor: 'divider',
				cursor: 'pointer',
				transition: 'all 0.3s ease',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: (theme) => `0 12px 24px ${alpha(color, 0.2)}`,
					borderColor: color,
					'& .action-icon': {
						background: (theme) => `linear-gradient(135deg, ${color} 0%, ${theme.palette.primary.dark} 100%)`
					}
				}
			}}
			onClick={onClick}
		>
			<CardContent sx={{ p: 3 }}>
				<Box
					className="action-icon"
					sx={{
						width: 48,
						height: 48,
						borderRadius: 2,
						background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						mb: 2,
						transition: 'background 0.3s ease'
					}}
				>
					<Icon sx={{ fontSize: 24, color: 'white' }} />
				</Box>
				<Typography variant="h6" fontWeight={600} gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
		</Card>
	);

	const BookingCard = ({ booking }) => (
		<Card
			elevation={0}
			sx={{
				borderRadius: 2.5,
				border: '1px solid',
				borderColor: 'divider',
				transition: 'all 0.2s ease',
				'&:hover': {
					borderColor: 'primary.light',
					boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.12)}`
				}
			}}
		>
			<CardContent sx={{ p: 2.5 }}>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
					<Box>
						<Typography variant="h6" fontWeight={600} gutterBottom>
							{booking.carBrand} {booking.carModel}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Booking ID: #{booking._id}
						</Typography>
					</Box>
					<Chip
						label={booking.status}
						size="small"
						sx={{
							bgcolor: statusColorMap[booking.status],
							color: 'white',
							fontWeight: 600,
							fontSize: '0.75rem'
						}}
					/>
				</Stack>
				<Divider sx={{ my: 1.5 }} />
				<Grid container spacing={2}>
					<Grid size={{ xs: 6 }}>
						<Typography variant="caption" color="text.secondary" display="block">
							Start Date
						</Typography>
						<Typography variant="body2" fontWeight={500}>
							{new Date(booking.startDate).toLocaleDateString()}
						</Typography>
					</Grid>
					<Grid size={{ xs: 6 }}>
						<Typography variant="caption" color="text.secondary" display="block">
							End Date
						</Typography>
						<Typography variant="body2" fontWeight={500}>
							{new Date(booking.endDate).toLocaleDateString()}
						</Typography>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<Typography variant="caption" color="text.secondary" display="block">
							Total Amount
						</Typography>
						<Typography variant="h6" fontWeight={700} color="primary.main">
							₹{booking.totalPrice?.toLocaleString('en-IN')}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);

	return (
		<Box
			sx={{
				p: { xs: 2, sm: 3, md: 4 },
				minHeight: '100vh',
				bgcolor: 'background.default'
			}}
		>
			{/* Welcome Header */}
			<Box sx={{ mb: 4 }}>
				<Stack direction="row" alignItems="center" spacing={2} mb={1}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: 48,
							height: 48,
							borderRadius: 2,
							background: (theme) =>
								`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
							boxShadow: (theme) =>
								`0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
						}}
					>
						<DashboardIcon sx={{ color: 'white', fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							color="text.primary"
							sx={{ letterSpacing: '-0.02em' }}
						>
							Welcome back, {user.username}!
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Here's your rental dashboard overview
						</Typography>
					</Box>
				</Stack>
			</Box>

			{/* Stats Cards */}
			<Grid container spacing={3} mb={4}>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={BookingIcon}
						title="Total Bookings"
						value={stats.total}
						color="primary.main"
						bgColor={(theme) => alpha(theme.palette.primary.main, 0.1)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={ScheduleIcon}
						title="Upcoming"
						value={stats.upcoming}
						color="info.main"
						bgColor={(theme) => alpha(theme.palette.info.main, 0.1)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={CheckIcon}
						title="Completed"
						value={stats.completed}
						color="success.main"
						bgColor={(theme) => alpha(theme.palette.success.main, 0.1)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<StatCard
						icon={CancelIcon}
						title="Cancelled"
						value={stats.cancelled}
						color="error.main"
						bgColor={(theme) => alpha(theme.palette.error.main, 0.1)}
					/>
				</Grid>
			</Grid>

			{/* Quick Actions */}
			<Box sx={{ mb: 4 }}>
				<Typography variant="h5" fontWeight={700} mb={2.5}>
					Quick Actions
				</Typography>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, sm: 6, md: 4 }}>
						<QuickActionCard
							icon={CarIcon}
							title="Browse Cars"
							description="Explore available vehicles for rent"
							onClick={() => navigate('/customer/viewCars')}
							color="#1E3A8A"
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 4 }}>
						<QuickActionCard
							icon={BookingIcon}
							title="My Bookings"
							description="View and manage your reservations"
							onClick={() => navigate('/customer/myBookings')}
							color="#10B981"
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 4 }}>
						<QuickActionCard
							icon={TrendingIcon}
							title="Profile"
							description="Update your account information"
							onClick={() => navigate('/customer/profile')}
							color="#F59E0B"
						/>
					</Grid>
				</Grid>
			</Box>

			{/* Upcoming Bookings */}
			<Box>
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
					<Typography variant="h5" fontWeight={700}>
						Upcoming Bookings
					</Typography>
					{upcomingBookings.length > 0 && (
						<Button
							endIcon={<ArrowIcon />}
							onClick={() => navigate('/customer/myBookings')}
							sx={{ textTransform: 'none', fontWeight: 600 }}
						>
							View All
						</Button>
					)}
				</Stack>

				{upcomingBookings.length === 0 ? (
					<Card
						elevation={0}
						sx={{
							borderRadius: 3,
							border: '1px solid',
							borderColor: 'divider',
							textAlign: 'center',
							py: 6
						}}
					>
						<Box
							sx={{
								width: 80,
								height: 80,
								borderRadius: '50%',
								bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								mx: 'auto',
								mb: 2
							}}
						>
							<BookingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
						</Box>
						<Typography variant="h6" fontWeight={600} gutterBottom>
							No upcoming bookings
						</Typography>
						<Typography variant="body2" color="text.secondary" mb={3}>
							Start exploring our collection of vehicles
						</Typography>
						<Button
							variant="contained"
							startIcon={<CarIcon />}
							onClick={() => navigate('/customer/viewCars')}
							sx={{
								textTransform: 'none',
								fontWeight: 600,
								px: 3,
								py: 1.2,
								borderRadius: 2
							}}
						>
							Browse Cars
						</Button>
					</Card>
				) : (
					<Grid container spacing={3}>
						{upcomingBookings.map((booking) => (
							<Grid size={{ xs: 12, md: 6, lg: 4 }} key={booking.bookingId}>
								<BookingCard booking={booking} />
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
}

export default CustomerHome;
