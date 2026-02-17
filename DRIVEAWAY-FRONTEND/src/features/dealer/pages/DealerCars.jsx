import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Box,
	CircularProgress,
	Chip,
	Divider,
	alpha,
	Stack,
	Button
} from "@mui/material";
import {
	DirectionsCar as CarIcon,
	CalendarMonth as YearIcon,
	CurrencyRupee as PriceIcon,
	Tag as IdIcon
} from "@mui/icons-material";
import { toast } from "sonner";
import { getCarsByDealer } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { brandsArray } from "../../../shared/constants/brands";
import CarUpdateModal from "../components/CarUpdateModal";

export default function DealerCars() {
	const { user, statusColorMap } = useAuth();
	const dealerId = user.userId;

	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCar, setSelectedCar] = useState(null);


	const loadCars = async () => {
			try {
				const { data } = await getCarsByDealer(dealerId);
				if (typeof data === "string") toast.info(data);
				else setCars(data);
			} catch {
				toast.error("Failed to load cars");
			} finally {
				setLoading(false);
			}
		};

	useEffect(() => {
		loadCars();
	}, [dealerId]);

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
					Loading your cars...
				</Typography>
			</Box>
		);
	}

	const getBrandLogo = (brand) =>
		brandsArray.find((b) => b.value === brand)?.logo;

	const DetailRow = ({ icon: Icon, label, value }) => (
		<Stack
			direction="row"
			alignItems="center"
			spacing={1.5}
			sx={{ py: 0.75 }}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: 32,
					height: 32,
					borderRadius: 1.5,
					bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
					color: "primary.main"
				}}
			>
				<Icon fontSize="small" />
			</Box>
			<Box>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{ display: "block", lineHeight: 1.2 }}
				>
					{label}
				</Typography>
				<Typography
					variant="body2"
					fontWeight={500}
					color="text.primary"
					sx={{ lineHeight: 1.3 }}
				>
					{value}
				</Typography>
			</Box>
		</Stack>
	);

	return (
		<>
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
						<CarIcon sx={{ color: "white", fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							color="text.primary"
							sx={{ letterSpacing: "-0.02em" }}
						>
							My Cars
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Manage your vehicle inventory
						</Typography>
					</Box>
				</Stack>
			</Box>

			{/* Cars Count Badge */}
			{cars.length > 0 && (
				<Box sx={{ mb: 3 }}>
					<Chip
						label={`${cars.length} ${cars.length === 1 ? "Vehicle" : "Vehicles"}`}
						size="small"
						sx={{
							bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
							color: "primary.main",
							fontWeight: 600,
							px: 1
						}}
					/>
				</Box>
			)}

			{/* Cars Grid */}
			<Grid container spacing={3}>
				{cars.map((car) => (
					<Grid item xs={12} sm={6} lg={4} xl={3} key={car.carId}>
						<Card
							elevation={0}
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								borderRadius: 3,
								border: "1px solid",
								borderColor: "divider",
								bgcolor: "background.paper",
								overflow: "hidden",
								transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
								"&:hover": {
									transform: "translateY(-4px)",
									boxShadow: (theme) =>
										`0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
									borderColor: "primary.light",
									"& .card-header": {
										background: (theme) =>
											`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
									}
								}
							}}
						>
							{/* Card Header with Brand */}
							<Box
								className="card-header"
								sx={{
									p: 2.5,
									background: (theme) =>
										`linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
									transition: "background 0.3s ease"
								}}
							>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Stack direction="row" alignItems="center" spacing={2}>
										{getBrandLogo(car.brand) && (
											<Box
												sx={{
													width: 52,
													height: 52,
													borderRadius: 2,
													bgcolor: "white",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
												}}
											>
												<img
													src={getBrandLogo(car.brand)}
													alt={car.brand}
													width={36}
													height={36}
													style={{ objectFit: "contain" }}
												/>
											</Box>
										)}
										<Box>
											<Typography
												variant="h6"
												fontWeight={700}
												sx={{
													color: "white",
													lineHeight: 1.2,
													textShadow: "0 1px 2px rgba(0,0,0,0.1)"
												}}
											>
												{car.brand}
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: "rgba(255,255,255,0.85)",
													fontWeight: 500
												}}
											>
												{car.model}
											</Typography>
										</Box>
									</Stack>
									<Chip
										label={car.carStatus}
										size="small"
										sx={{
											bgcolor: statusColorMap[car.carStatus],
											color: "white",
											fontWeight: 600,
											fontSize: "0.75rem",
											height: 26,
											boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
										}}
									/>
								</Stack>
							</Box>

							{/* Card Content */}
							<CardContent
								sx={{
									p: 2.5,
									pt: 2,
									flexGrow: 1,
									display: "flex",
									flexDirection: "column"
								}}
							>
								<Stack spacing={0.5} sx={{ flexGrow: 1 }}>
									<DetailRow
										icon={YearIcon}
										label="Year"
										value={car.year}
									/>
									<Divider sx={{ my: 0.5 }} />
									<DetailRow
										icon={IdIcon}
										label="Car ID"
										value={`#${car.carId}`}
									/>
									<Divider sx={{ my: 0.5 }} />
									<DetailRow
										icon={PriceIcon}
										label="Price per Day"
										value={`₹${car.pricePerDay.toLocaleString("en-IN")}`}
									/>
								</Stack>

								{/* Price Highlight */}
								<Box
									sx={{
										mt: 2,
										p: 1.5,
										borderRadius: 2,
										bgcolor: (theme) =>
											alpha(theme.palette.accent?.main || "#FF6B35", 0.08),
										border: "1px solid",
										borderColor: (theme) =>
											alpha(theme.palette.accent?.main || "#FF6B35", 0.2),
										textAlign: "center"
									}}
								>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 0.25 }}
									>
										Daily Rate
									</Typography>
									<Typography
										variant="h5"
										fontWeight={700}
										sx={{
											color: (theme) =>
												theme.palette.accent?.main || "#FF6B35",
											letterSpacing: "-0.02em"
										}}
									>
										₹{car.pricePerDay.toLocaleString("en-IN")}
									</Typography>
									<Button
										variant="outlined"
										onClick={() => {
											setSelectedCar(car);
											setModalOpen(true);
										}}
										sx={{ mt: 2 }}
									>
										Manage Car
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Empty State */}
			{cars.length === 0 && (
				<Box
					sx={{
						textAlign: "center",
						py: 8,
						px: 3
					}}
				>
					<Box
						sx={{
							width: 80,
							height: 80,
							borderRadius: "50%",
							bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mx: "auto",
							mb: 3
						}}
					>
						<CarIcon
							sx={{ fontSize: 40, color: "primary.main", opacity: 0.7 }}
						/>
					</Box>
					<Typography variant="h6" color="text.primary" gutterBottom>
						No cars listed yet
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Start by adding your first vehicle to the inventory
					</Typography>
				</Box>
			)}
		</Box>
		<Box>
			<CarUpdateModal
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				car={selectedCar}
				reloadCars={loadCars}
				onUpdate={(updatedCar) => {
					setCars(cars.map(c => c.carId === updatedCar.carId ? updatedCar : c));
				}}
			/>
		</Box>
		</>
	);
}
