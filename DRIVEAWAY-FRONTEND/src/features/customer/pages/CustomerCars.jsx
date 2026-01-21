import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	CircularProgress,
	Alert,
	Stack,
	Chip,
	alpha
} from "@mui/material";
import { DirectionsCar as CarIcon } from "@mui/icons-material";
import { getCars } from "../services";
import CarsGrid from "../components/CarsGrid";



export default function CustomerCars() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const loadCars = async () => {
		setLoading(true);
		setError("");
		try {
			const { data } = await getCars();
			console.log(data); 
			if (typeof (data) == "string") setMessage(data);
			else setCars(data);
		} catch (err) {
			setError(
				err?.response?.data?.message ||
				err?.message ||
				"Failed to load cars"
			);
		} finally{
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCars();
	}, []);


	/* 🔄 Loading */
	if (loading) {
		return (<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				minHeight="60vh"
				gap={2}
			>
				<CircularProgress size={48} thickness={4} />
				<Typography variant="body2" color="text.secondary">
					Loading available cars...
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
						<CarIcon sx={{ color: "white", fontSize: 28 }} />
					</Box>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							color="text.primary"
							sx={{ letterSpacing: "-0.02em" }}
						>
							Available Cars
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Browse and book your perfect vehicle
						</Typography>
					</Box>
				</Stack>
			</Box>

			{/* Alerts */}
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
			{message && (
				<Alert
					severity="info"
					sx={{
						mb: 3,
						borderRadius: 2,
						"& .MuiAlert-icon": { alignItems: "center" }
					}}
				>
					{message}
				</Alert>
			)}

			{/* Cars Count Badge */}
			{cars.length > 0 && (
				<Box sx={{ mb: 3 }}>
					<Chip
						label={`${cars.length} ${cars.length === 1 ? "Vehicle" : "Vehicles"} Available`}
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
			<CarsGrid cars={cars} reloadCars={loadCars} />
		</Box>
	);
}
