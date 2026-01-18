import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Box,
	CircularProgress,
	Alert,
	Chip
} from "@mui/material";
import { getCarsByDealer } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { brandsArray } from "../../../shared/constants/brands";

const statusColorMap = {
	AVAILABLE: "success",
	PENDING: "warning",
	APPROVED: "info",
	ACTIVE: "secondary",
	COMPLETED: "default",
	CANCELLED: "error",
	REJECTED: "error"
};

export default function DealerCars() {
	const { user } = useAuth();
	const dealerId = user.userId;

	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const loadCars = async () => {
			try {
				const { data } = await getCarsByDealer(dealerId);
				if (typeof data === "string") setMessage(data);
				else setCars(data);
			} catch {
				setError("Failed to load cars");
			} finally {
				setLoading(false);
			}
		};

		loadCars();
	}, [dealerId]);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" mt={10}>
				<CircularProgress />
			</Box>
		);
	}

	const getBrandLogo = (brand) =>
		brandsArray.find((b) => b.value === brand)?.logo;

	return (
		<Box p={4}>
			<Typography variant="h5" mb={3}>
				My Cars
			</Typography>

			{error && <Alert severity="error">{error}</Alert>}
			{message && <Alert severity="info">{message}</Alert>}

			<Grid container spacing={4}>
				{cars.map((car) => (
					<Grid item xs={12} sm={6} md={4} key={car.carId}>
						<Card elevation={4} sx={{ height: "100%" }}>
							<CardContent>
								<Box display="flex" alignItems="center" gap={1.5} mb={2}>
									{getBrandLogo(car.brand) && (
										<img
											src={getBrandLogo(car.brand)}
											alt={car.brand}
											width={40}
											height={40}
											style={{ objectFit: "contain" }}
										/>
									)}
									<Typography variant="h6" fontWeight={600}>
										{car.brand} {car.model}
									</Typography>
								</Box>

								<Typography color="text.secondary" mb={0.5}>
									Year: {car.year}
								</Typography>

								<Typography color="text.secondary" mb={0.5}>
									ID: {car.carId}
								</Typography>

								<Typography color="text.secondary">
									₹{car.pricePerDay} / day
								</Typography>

								<Box mt={2}>
									<Chip
										label={car.carStatus}
										color={statusColorMap[car.carStatus] || "default"}
										size="medium"
									/>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
