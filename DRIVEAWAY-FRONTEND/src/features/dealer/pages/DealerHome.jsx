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
	LinearProgress,
	Stack,
	Tooltip,
	Typography,
	alpha,
	useTheme
} from "@mui/material";
import {
	AddCircle as AddIcon,
	CarRental as FleetIcon,
	DirectionsCar as CarIcon,
	EventNote as BookingIcon,
	PendingActions as PendingIcon,
	CurrencyRupee as RevenueIcon,
	TrendingUp as TrendingUpIcon,
	TrendingDown as TrendingDownIcon,
	Speed as UtilizationIcon,
	BarChart as ChartIcon,
	EmojiEvents as TrophyIcon
} from "@mui/icons-material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { isHtmlResponse } from "../../../shared/utils/responseUtils";
import { getBookings, getCarsByDealer } from "../services";

const getBookingDate = (booking) => new Date(booking.startDate || booking.createdAt);

const formatCompactCurrency = (amount) => {
	if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
	if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
	return `₹${amount}`;
};

const pluralize = (count, singular, plural = `${singular}s`) =>
	count === 1 ? `${count} ${singular}` : `${count} ${plural}`;

const StatCard = ({ icon: Icon, title, value, helper, color, bgColor, trend }) => (
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
					<Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
						{trend !== undefined && trend !== null && (
							<Chip
								icon={
									trend >= 0 ? (
										<TrendingUpIcon sx={{ fontSize: 14 }} />
									) : (
										<TrendingDownIcon sx={{ fontSize: 14 }} />
									)
								}
								label={`${trend >= 0 ? "+" : ""}${trend}%`}
								size="small"
								sx={{
									height: 22,
									fontSize: "0.7rem",
									fontWeight: 600,
									bgcolor:
										trend >= 0
											? alpha("#2E7D32", 0.1)
											: alpha("#D32F2F", 0.1),
									color: trend >= 0 ? "#2E7D32" : "#D32F2F",
									"& .MuiChip-icon": { color: "inherit" }
								}}
							/>
						)}
						{helper && (
							<Typography variant="caption" color="text.secondary">
								{helper}
							</Typography>
						)}
					</Stack>
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
	const theme = useTheme();
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

	const carsMap = useMemo(() => {
		const map = {};
		cars.forEach((car) => {
			map[car.carId] = car;
		});
		return map;
	}, [cars]);

	const stats = useMemo(() => {
		const totalCars = cars.length;
		const availableCars = cars.filter(
			(car) => car.carStatus === "AVAILABLE"
		).length;
		const bookedCars = totalCars - availableCars;
		const fleetUtilization =
			totalCars > 0 ? Math.round((bookedCars / totalCars) * 100) : 0;

		const completedBookings = bookings.filter(
			(b) => b.status === "COMPLETED" || b.status === "PAID"
		);
		const activeBookings = bookings.filter(
			(b) => b.status === "APPROVED" || b.status === "ACTIVE"
		);
		const pendingBookings = bookings.filter(
			(b) => b.status === "PENDING"
		);
		const cancelledBookings = bookings.filter(
			(b) =>
				b.status === "CANCELLED" ||
				b.status === "REJECTED" ||
				b.status === "EXPIRED"
		);

		const totalRevenue = completedBookings.reduce(
			(sum, b) => sum + (b.totalAmount || 0),
			0
		);
		const avgBookingValue =
			completedBookings.length > 0
				? Math.round(totalRevenue / completedBookings.length)
				: 0;

		return {
			totalCars,
			availableCars,
			bookedCars,
			fleetUtilization,
			totalBookings: bookings.length,
			completedCount: completedBookings.length,
			activeCount: activeBookings.length,
			pendingCount: pendingBookings.length,
			cancelledCount: cancelledBookings.length,
			totalRevenue,
			avgBookingValue
		};
	}, [cars, bookings]);

	const revenueTrend = useMemo(() => {
		const now = new Date();
		const thisMonth = now.getMonth();
		const thisYear = now.getFullYear();
		const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
		const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;

		const getMonthRevenue = (month, year) =>
			bookings
				.filter(
					(b) => b.status === "COMPLETED" || b.status === "PAID"
				)
				.filter((b) => {
					const d = getBookingDate(b);
					return d.getMonth() === month && d.getFullYear() === year;
				})
				.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

		const thisMonthRevenue = getMonthRevenue(thisMonth, thisYear);
		const lastMonthRevenue = getMonthRevenue(lastMonth, lastYear);
		// Only show trend when prior month has data for a meaningful comparison
		const percentChange =
			lastMonthRevenue > 0
				? Math.round(
						((thisMonthRevenue - lastMonthRevenue) /
							lastMonthRevenue) *
							100
					)
				: null;

		return { thisMonthRevenue, lastMonthRevenue, percentChange };
	}, [bookings]);

	const monthlyRevenue = useMemo(() => {
		const now = new Date();
		const months = [];
		for (let i = 5; i >= 0; i--) {
			const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
			months.push({
				label: d.toLocaleDateString("en-US", { month: "short" }),
				year: d.getFullYear(),
				month: d.getMonth(),
				revenue: 0,
				count: 0
			});
		}

		bookings
			.filter(
				(b) => b.status === "COMPLETED" || b.status === "PAID"
			)
			.forEach((b) => {
				const date = getBookingDate(b);
				const entry = months.find(
					(m) =>
						m.month === date.getMonth() &&
						m.year === date.getFullYear()
				);
				if (entry) {
					entry.revenue += b.totalAmount || 0;
					entry.count += 1;
				}
			});

		return months;
	}, [bookings]);

	const topCars = useMemo(() => {
		const carRevenue = {};
		bookings
			.filter(
				(b) => b.status === "COMPLETED" || b.status === "PAID"
			)
			.forEach((b) => {
				if (!carRevenue[b.carId]) {
					const car = carsMap[b.carId];
					carRevenue[b.carId] = {
						carId: b.carId,
						brand: car?.brand || "Unknown",
						model: car?.model || "Unknown",
						revenue: 0,
						bookings: 0
					};
				}
				carRevenue[b.carId].revenue += b.totalAmount || 0;
				carRevenue[b.carId].bookings += 1;
			});

		return Object.values(carRevenue)
			.sort((a, b) => b.revenue - a.revenue)
			.slice(0, 5);
	}, [carsMap, bookings]);

	const recentBookings = useMemo(
		() =>
			[...bookings]
				.sort(
					(a, b) =>
						new Date(b.startDate || 0).getTime() -
						new Date(a.startDate || 0).getTime()
				)
				.slice(0, 5),
		[bookings]
	);

	const maxMonthlyRevenue = useMemo(
		() => Math.max(...monthlyRevenue.map((m) => m.revenue), 1),
		[monthlyRevenue]
	);

	const statusBreakdown = useMemo(() => {
		const items = [
			{
				label: "Completed",
				count: stats.completedCount,
				color: "#43A047"
			},
			{
				label: "Active",
				count: stats.activeCount,
				color: "#7B1FA2"
			},
			{
				label: "Pending",
				count: stats.pendingCount,
				color: "#ED6C02"
			},
			{
				label: "Cancelled",
				count: stats.cancelledCount,
				color: "#D32F2F"
			}
		].filter((s) => s.count > 0);
		return items;
	}, [stats]);

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
			{/* Header */}
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

			{/* KPI Stats Row */}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(5, 1fr)"
					},
					gap: 3,
					mb: 3
				}}
			>
				<StatCard
					icon={RevenueIcon}
					title="Total Revenue"
					value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
					helper="from completed bookings"
					color="primary.main"
					bgColor={(theme) =>
						alpha(theme.palette.primary.main, 0.12)
					}
					trend={revenueTrend.percentChange}
				/>
				<StatCard
					icon={BookingIcon}
					title="Total Bookings"
					value={stats.totalBookings}
					helper={`${stats.completedCount} completed`}
					color="info.main"
					bgColor={(theme) =>
						alpha(theme.palette.info.main, 0.12)
					}
				/>
				<StatCard
					icon={PendingIcon}
					title="Active Rentals"
					value={stats.activeCount}
					helper={`${stats.pendingCount} pending approval`}
					color="warning.main"
					bgColor={(theme) =>
						alpha(theme.palette.warning.main, 0.12)
					}
				/>
				<StatCard
					icon={UtilizationIcon}
					title="Fleet Utilization"
					value={`${stats.fleetUtilization}%`}
					helper={`${stats.bookedCars} of ${stats.totalCars} cars in use`}
					color="success.main"
					bgColor={(theme) =>
						alpha(theme.palette.success.main, 0.12)
					}
				/>
				<StatCard
					icon={FleetIcon}
					title="Avg. Booking Value"
					value={`₹${stats.avgBookingValue.toLocaleString("en-IN")}`}
					helper="per completed booking"
					color="secondary.main"
					bgColor={(theme) =>
						alpha(theme.palette.secondary.main, 0.12)
					}
				/>
			</Box>

			{/* Revenue Trend & Booking Status */}
			<Grid container spacing={3} sx={{ mb: 3 }}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Card
						elevation={0}
						sx={{
							borderRadius: 3,
							border: "1px solid",
							borderColor: "divider",
							height: "100%"
						}}
					>
						<CardContent sx={{ p: 3 }}>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								mb={3}
							>
								<Stack
									direction="row"
									spacing={1.5}
									alignItems="center"
								>
									<ChartIcon color="primary" />
									<Box>
										<Typography
											variant="h6"
											fontWeight={600}
										>
											Revenue Trend
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											Monthly earnings over the last 6
											months
										</Typography>
									</Box>
								</Stack>
								<Chip
									label={`This month: ₹${revenueTrend.thisMonthRevenue.toLocaleString("en-IN")}`}
									size="small"
									sx={{
										fontWeight: 600,
										bgcolor: alpha(
											theme.palette.primary.main,
											0.08
										),
										color: "primary.main"
									}}
								/>
							</Stack>

							{/* Bar Chart */}
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-end",
									gap: { xs: 1, sm: 2 },
									height: 220,
									pt: 2,
									pb: 1
								}}
							>
								{monthlyRevenue.map((month, index) => {
									const barHeight =
										maxMonthlyRevenue > 0
											? (month.revenue /
													maxMonthlyRevenue) *
												170
											: 0;
									const now = new Date();
									const isCurrentMonth = month.month === now.getMonth() && month.year === now.getFullYear();
									return (
										<Tooltip
											key={index}
											title={`₹${month.revenue.toLocaleString("en-IN")} • ${pluralize(month.count, "booking")}`}
											arrow
										>
											<Box
												sx={{
													flex: 1,
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													gap: 0.5
												}}
											>
												<Typography
													variant="caption"
													fontWeight={600}
													color="text.secondary"
													sx={{
														fontSize: "0.65rem"
													}}
												>
													{month.revenue > 0
														? formatCompactCurrency(month.revenue)
														: ""}
												</Typography>
												<Box
													sx={{
														width: "100%",
														maxWidth: 64,
														height: Math.max(
															barHeight,
															4
														),
														borderRadius:
															"8px 8px 4px 4px",
														background:
															month.revenue > 0
																? isCurrentMonth
																	? `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
																	: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.7)} 0%, ${alpha(theme.palette.primary.dark, 0.5)} 100%)`
																: alpha(
																		theme
																			.palette
																			.text
																			.disabled,
																		0.08
																	),
														transition:
															"height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
														cursor: "pointer",
														"&:hover": {
															opacity: 0.85,
															transform:
																"scaleY(1.03)",
															transformOrigin:
																"bottom"
														}
													}}
												/>
												<Typography
													variant="caption"
													color={
														isCurrentMonth
															? "primary.main"
															: "text.secondary"
													}
													fontWeight={
														isCurrentMonth
															? 700
															: 500
													}
												>
													{month.label}
												</Typography>
											</Box>
										</Tooltip>
									);
								})}
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={3} sx={{ height: "100%" }}>
						{/* Booking Status Distribution */}
						<Card
							elevation={0}
							sx={{
								borderRadius: 3,
								border: "1px solid",
								borderColor: "divider",
								flex: 1
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Typography
									variant="h6"
									fontWeight={600}
									mb={0.5}
								>
									Booking Breakdown
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									mb={2}
								>
									Status distribution of all bookings
								</Typography>
								{statusBreakdown.length === 0 ? (
									<Typography
										variant="body2"
										color="text.secondary"
									>
										No bookings yet
									</Typography>
								) : (
									<Stack spacing={1.5}>
										{statusBreakdown.map((status) => (
											<Box key={status.label}>
												<Stack
													direction="row"
													justifyContent="space-between"
													mb={0.5}
												>
													<Stack
														direction="row"
														alignItems="center"
														spacing={1}
													>
														<Box
															sx={{
																width: 10,
																height: 10,
																borderRadius:
																	"50%",
																bgcolor:
																	status.color
															}}
														/>
														<Typography
															variant="body2"
															fontWeight={500}
														>
															{status.label}
														</Typography>
													</Stack>
													<Typography
														variant="body2"
														fontWeight={600}
													>
														{status.count} (
														{stats.totalBookings >
														0
															? Math.round(
																	(status.count /
																		stats.totalBookings) *
																		100
																)
															: 0}
														%)
													</Typography>
												</Stack>
												<LinearProgress
													variant="determinate"
													value={
														stats.totalBookings > 0
															? (status.count /
																	stats.totalBookings) *
																100
															: 0
													}
													sx={{
														height: 8,
														borderRadius: 4,
														bgcolor: alpha(
															status.color,
															0.12
														),
														"& .MuiLinearProgress-bar":
															{
																borderRadius: 4,
																bgcolor:
																	status.color
															}
													}}
												/>
											</Box>
										))}
									</Stack>
								)}
							</CardContent>
						</Card>

						{/* Fleet Composition */}
						<Card
							elevation={0}
							sx={{
								borderRadius: 3,
								border: "1px solid",
								borderColor: "divider"
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Typography
									variant="h6"
									fontWeight={600}
									mb={1}
								>
									Fleet Overview
								</Typography>
								<Stack
									direction="row"
									spacing={3}
									alignItems="center"
								>
									<Box
										sx={{
											position: "relative",
											display: "inline-flex"
										}}
									>
										<CircularProgress
											variant="determinate"
											value={stats.fleetUtilization}
											size={72}
											thickness={5}
											sx={{
												color: "success.main",
												"& .MuiCircularProgress-circle":
													{
														strokeLinecap: "round"
													}
											}}
										/>
										<CircularProgress
											variant="determinate"
											value={100}
											size={72}
											thickness={5}
											sx={{
												color: alpha(
													theme.palette.success.main,
													0.12
												),
												position: "absolute",
												left: 0
											}}
										/>
										<Box
											sx={{
												position: "absolute",
												inset: 0,
												display: "flex",
												alignItems: "center",
												justifyContent: "center"
											}}
										>
											<Typography
												variant="caption"
												fontWeight={700}
												color="success.main"
											>
												{stats.fleetUtilization}%
											</Typography>
										</Box>
									</Box>
									<Box>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											<strong>
												{stats.availableCars}
											</strong>{" "}
											available
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											<strong>{stats.bookedCars}</strong>{" "}
											in use
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											<strong>{stats.totalCars}</strong>{" "}
											total fleet
										</Typography>
									</Box>
								</Stack>
							</CardContent>
						</Card>
					</Stack>
				</Grid>
			</Grid>

			{/* Top Cars & Recent Bookings */}
			<Grid container spacing={3} sx={{ mb: 3 }}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Card
						elevation={0}
						sx={{
							borderRadius: 3,
							border: "1px solid",
							borderColor: "divider",
							height: "100%"
						}}
					>
						<CardContent sx={{ p: 3 }}>
							<Stack
								direction="row"
								spacing={1.5}
								alignItems="center"
								mb={2}
							>
								<TrophyIcon
									sx={{ color: "#D97706", fontSize: 24 }}
								/>
								<Box>
									<Typography
										variant="h6"
										fontWeight={600}
									>
										Top Performing Cars
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										Highest revenue-generating vehicles
									</Typography>
								</Box>
							</Stack>
							<Divider sx={{ mb: 2 }} />
							{topCars.length === 0 ? (
								<Typography
									variant="body2"
									color="text.secondary"
								>
									No completed bookings yet. Revenue data will
									appear here.
								</Typography>
							) : (
								<Stack spacing={2}>
									{topCars.map((car, index) => {
										const maxRev =
											topCars[0]?.revenue || 1;
										return (
											<Box key={car.carId}>
												<Stack
													direction="row"
													justifyContent="space-between"
													alignItems="center"
													mb={0.5}
												>
													<Stack
														direction="row"
														spacing={1.5}
														alignItems="center"
													>
														<Box
															sx={{
																width: 28,
																height: 28,
																borderRadius:
																	"50%",
																bgcolor:
																	index === 0
																		? alpha(
																				"#D97706",
																				0.15
																			)
																		: alpha(
																				theme
																					.palette
																					.text
																					.secondary,
																				0.08
																			),
																display: "flex",
																alignItems:
																	"center",
																justifyContent:
																	"center"
															}}
														>
															<Typography
																variant="caption"
																fontWeight={700}
																color={
																	index === 0
																		? "#D97706"
																		: "text.secondary"
																}
															>
																{index + 1}
															</Typography>
														</Box>
														<Box>
															<Typography
																variant="body2"
																fontWeight={600}
															>
																{car.brand}{" "}
																{car.model}
															</Typography>
															<Typography
																variant="caption"
																color="text.secondary"
															>
																{pluralize(car.bookings, "booking")}
															</Typography>
														</Box>
													</Stack>
													<Typography
														variant="body2"
														fontWeight={700}
														color="primary.main"
													>
														₹
														{car.revenue.toLocaleString(
															"en-IN"
														)}
													</Typography>
												</Stack>
												<LinearProgress
													variant="determinate"
													value={
														(car.revenue /
															maxRev) *
														100
													}
													sx={{
														height: 6,
														borderRadius: 3,
														bgcolor: alpha(
															theme.palette
																.primary.main,
															0.08
														),
														"& .MuiLinearProgress-bar":
															{
																borderRadius: 3,
																background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
															}
													}}
												/>
											</Box>
										);
									})}
								</Stack>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Card
						elevation={0}
						sx={{
							borderRadius: 3,
							border: "1px solid",
							borderColor: "divider",
							height: "100%"
						}}
					>
						<CardContent sx={{ p: 3 }}>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
							>
								<Stack
									direction="row"
									spacing={1.5}
									alignItems="center"
								>
									<BookingIcon color="primary" />
									<Box>
										<Typography
											variant="h6"
											fontWeight={600}
										>
											Recent Booking Activity
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											Latest reservations and status
											updates
										</Typography>
									</Box>
								</Stack>
								<Button
									variant="outlined"
									size="small"
									onClick={() =>
										navigate("/dealer/bookings")
									}
								>
									View All
								</Button>
							</Stack>
							<Divider sx={{ my: 2 }} />
							{recentBookings.length === 0 ? (
								<Typography
									variant="body2"
									color="text.secondary"
								>
									No booking activity yet. New requests will
									appear here.
								</Typography>
							) : (
								<Stack spacing={2}>
									{recentBookings.map((booking, index) => {
										const bookingLabel = booking.bookingId
											? booking.bookingId.length > 6
												? booking.bookingId.slice(-6)
												: booking.bookingId
											: "N/A";
										const car = carsMap[booking.carId];
										const carDisplay = car
											? `${car.brand} ${car.model}`
											: booking.carId
												? `Car #${booking.carId.slice(-6)}`
												: "Car pending";
										return (
											<Box
												key={
													booking.bookingId || index
												}
											>
												<Stack
													direction="row"
													justifyContent="space-between"
													alignItems="center"
												>
													<Box>
														<Typography
															variant="subtitle2"
															fontWeight={600}
														>
															Booking #
															{bookingLabel}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															{carDisplay} •{" "}
															{booking.startDate
																? new Date(
																		booking.startDate
																	).toLocaleDateString()
																: "Date pending"}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Amount: ₹
															{(
																booking.totalAmount ||
																0
															).toLocaleString(
																"en-IN"
															)}
														</Typography>
													</Box>
													<Chip
														label={getStatusLabel(
															booking.status
														)}
														size="small"
														sx={{
															bgcolor:
																statusColorMap[
																	booking
																		.status
																] ||
																"primary.main",
															color: "white",
															fontWeight: 600
														}}
													/>
												</Stack>
												{index !==
													recentBookings.length -
														1 && (
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
			</Grid>

			{/* Quick Actions */}
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<QuickActionCard
						icon={AddIcon}
						title="Add a New Car"
						description="List another vehicle in your inventory."
						onClick={() => navigate("/dealer/addCar")}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<QuickActionCard
						icon={FleetIcon}
						title="Manage Cars"
						description="Review and update your fleet details."
						onClick={() => navigate("/dealer/allCars")}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<QuickActionCard
						icon={BookingIcon}
						title="Bookings"
						description="Respond to booking requests quickly."
						onClick={() => navigate("/dealer/bookings")}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default DealerHome;
