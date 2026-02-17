import React, { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	Typography,
	alpha
} from "@mui/material";
import {
	AddCircle as AddIcon,
	CarRental as FleetIcon,
	DirectionsCar as CarIcon,
	EventNote as BookingIcon,
	PendingActions as PendingIcon,
	CurrencyRupee as RevenueIcon
} from "@mui/icons-material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { isHtmlResponse } from "../../../shared/utils/responseUtils";
import { getBookings, getCarsByDealer } from "../services";

const StatCard = ({ icon: Icon, title, value, helper, color, bgColor }) => (
	<Card
		elevation={0}
		sx={{
			height: "100%",
			borderRadius: 3,
			border: "1px solid",
			borderColor: "divider",
			transition: "all 0.3s ease",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: (theme) =>
					`0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
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
					{helper && (
						<Typography variant="caption" color="text.secondary">
							{helper}
						</Typography>
					)}
				</Box>
				<Box
					sx={{
						width: 56,
						height: 56,
						borderRadius: 2,
						bgcolor: bgColor,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon sx={{ fontSize: 28, color }} />
				</Box>
			</Stack>
		</CardContent>
	</Card>
);

const QuickActionCard = ({ icon: Icon, title, description, onClick }) => (
	<Card
		elevation={0}
		sx={{
			borderRadius: 3,
			border: "1px solid",
			borderColor: "divider",
			cursor: "pointer",
			transition: "all 0.3s ease",
			"&:hover": {
				transform: "translateY(-4px)",
				boxShadow: (theme) =>
					`0 12px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
				borderColor: "primary.main"
			}
		}}
		onClick={onClick}
	>
		<CardContent sx={{ p: 3 }}>
			<Stack direction="row" spacing={2} alignItems="center">
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: 2,
						background: (theme) =>
							`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Icon sx={{ fontSize: 24, color: "white" }} />
				</Box>
				<Box>
					<Typography variant="subtitle1" fontWeight={600}>
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</Box>
			</Stack>
		</CardContent>
	</Card>
);

function DealerHome() {
	const { user, getStatusLabel, statusColorMap } = useAuth();
	const navigate = useNavigate();
	const [cars, setCars] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				const [carsResponse, bookingsResponse] = await Promise.all([
					getCarsByDealer(user.userId),
					getBookings(user.userId)
				]);
				const carsData = carsResponse?.data;
				if (Array.isArray(carsData)) {
					setCars(carsData);
				} else if (typeof carsData === "string") {
					if (isHtmlResponse(carsData)) {
						toast.error("Unable to load inventory summary right now.");
					} else {
						toast.info(carsData);
					}
					setCars([]);
				} else {
					setCars([]);
				}
				const bookingsData = bookingsResponse?.data;
				if (Array.isArray(bookingsData)) {
					setBookings(bookingsData);
				} else if (typeof bookingsData === "string") {
					if (isHtmlResponse(bookingsData)) {
						toast.error("Unable to load booking insights right now.");
					} else {
						toast.info(bookingsData);
					}
					setBookings([]);
				} else {
					setBookings([]);
				}
			} catch {
				toast.error("Failed to load dealer dashboard data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [user.userId]);

	const stats = useMemo(() => {
		const totalCars = cars.length;
		const availableCars = cars.filter((car) => car.carStatus === "AVAILABLE").length;
		const pendingBookings = bookings.filter((booking) => booking.status === "PENDING").length;
		const activeBookings = bookings.filter(
			(booking) => booking.status === "APPROVED" || booking.status === "ACTIVE"
		).length;
		const totalEarnings = bookings
			.filter(
				(booking) => booking.status === "COMPLETED" || booking.status === "PAID"
			)
			.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);

		return {
			totalCars,
			availableCars,
			pendingBookings,
			activeBookings,
			totalEarnings
		};
	}, [cars, bookings]);

	const recentBookings = useMemo(
		() =>
			[...bookings]
				.sort(
					(a, b) =>
						new Date(b.startDate || 0).getTime() -
						new Date(a.startDate || 0).getTime()
				)
				.slice(0, 4),
		[bookings]
	);

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

	return (
		<Box
			sx={{
				p: { xs: 2, sm: 3, md: 4 },
				minHeight: "100vh",
				bgcolor: "background.default"
			}}
		>
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
						<CarIcon sx={{ color: "white", fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							color="text.primary"
							sx={{ letterSpacing: "-0.02em" }}
						>
							Dealer Dashboard
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Monitor inventory, bookings, and revenue at a glance
						</Typography>
					</Box>
				</Stack>
			</Box>

			<Grid container spacing={3} sx={{ mb: 3 }}>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={FleetIcon}
						title="Total Cars"
						value={stats.totalCars}
						helper="Listed inventory"
						color="primary.main"
						bgColor={(theme) => alpha(theme.palette.primary.main, 0.12)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={CarIcon}
						title="Available Now"
						value={stats.availableCars}
						helper="Ready to book"
						color="success.main"
						bgColor={(theme) => alpha(theme.palette.success.main, 0.12)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={PendingIcon}
						title="Pending Requests"
						value={stats.pendingBookings}
						helper={`${stats.activeBookings} active bookings`}
						color="warning.main"
						bgColor={(theme) => alpha(theme.palette.warning.main, 0.12)}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatCard
						icon={RevenueIcon}
						title="Total Earnings"
						value={`₹${stats.totalEarnings.toLocaleString("en-IN")}`}
						helper="Completed payouts"
						color="secondary.main"
						bgColor={(theme) => alpha(theme.palette.secondary.main, 0.12)}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card
						elevation={0}
						sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
					>
						<CardContent sx={{ p: 3 }}>
							<Stack direction="row" justifyContent="space-between" alignItems="center">
								<Stack direction="row" spacing={1.5} alignItems="center">
									<BookingIcon color="primary" />
									<Box>
										<Typography variant="h6" fontWeight={600}>
											Recent Booking Activity
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Latest reservations and status updates
										</Typography>
									</Box>
								</Stack>
								<Button
									variant="outlined"
									size="small"
									onClick={() => navigate("/dealer/bookings")}
								>
									View All
								</Button>
							</Stack>
							<Divider sx={{ my: 2 }} />
							{recentBookings.length === 0 ? (
								<Typography variant="body2" color="text.secondary">
									No booking activity yet. New requests will appear here.
								</Typography>
							) : (
								<Stack spacing={2}>
									{recentBookings.map((booking, index) => {
										const bookingLabel = booking.bookingId
											? booking.bookingId.length > 6
												? booking.bookingId.slice(-6)
												: booking.bookingId
											: "N/A";
										const carDisplay = booking.carModel
											? `${booking.carBrand ?? ""} ${booking.carModel}`.trim()
											: booking.carId
												? `Car ID ${booking.carId}`
												: "Car ID pending";
										return (
											<Box key={booking.bookingId || index}>
												<Stack
													direction="row"
													justifyContent="space-between"
													alignItems="center"
												>
													<Box>
														<Typography variant="subtitle2" fontWeight={600}>
															Booking #{bookingLabel}
														</Typography>
														<Typography variant="body2" color="text.secondary">
															{carDisplay} •{" "}
															{booking.startDate
																? new Date(booking.startDate).toLocaleDateString()
																: "Date pending"}
														</Typography>
														<Typography variant="body2" color="text.secondary">
															Amount: ₹
															{(booking.totalAmount || 0).toLocaleString("en-IN")}
														</Typography>
													</Box>
													<Chip
														label={getStatusLabel(booking.status)}
														size="small"
														sx={{
															bgcolor:
																statusColorMap[booking.status] ||
																"primary.main",
															color: "white",
															fontWeight: 600
														}}
													/>
												</Stack>
												{index !== recentBookings.length - 1 && (
													<Divider sx={{ mt: 2 }} />
												)}
											</Box>
										);
									})}
								</Stack>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4}>
					<Stack spacing={2}>
						<QuickActionCard
							icon={AddIcon}
							title="Add a New Car"
							description="List another vehicle in your inventory."
							onClick={() => navigate("/dealer/addCar")}
						/>
						<QuickActionCard
							icon={FleetIcon}
							title="Manage Cars"
							description="Review and update your fleet details."
							onClick={() => navigate("/dealer/allCars")}
						/>
						<QuickActionCard
							icon={BookingIcon}
							title="Bookings"
							description="Respond to booking requests quickly."
							onClick={() => navigate("/dealer/bookings")}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DealerHome;
