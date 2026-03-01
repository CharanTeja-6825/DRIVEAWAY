import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	CircularProgress,
	Stack,
} from "@mui/material";
import { Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getCars } from "../services";
import CarsGrid from "../components/CarsGrid";
import { useAuth } from "../../../shared/hooks/AuthProvider";



export default function CustomerCars() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	const loadCars = async () => {
		setLoading(true);
		try {
			const { data } = await getCars();
			if (typeof (data) == "string") toast.info(data);
			else setCars(data);
		} catch (err) {
			toast.error(
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
		<div className="min-h-screen bg-slate-50/50 px-4 py-6 sm:px-6 md:px-8">
			{/* Page Header */}
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-1">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] shadow-lg shadow-blue-900/25">
						<Car className="h-6 w-6 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold font-[Manrope] text-slate-900 tracking-tight">
							Available Cars
						</h1>
						<p className="text-sm text-slate-500 font-[Source_Sans_3]">
							Browse and book your perfect vehicle
						</p>
					</div>
				</div>
			</div>

			{/* Cars Count Badge */}
			{cars.length > 0 && (
				<div className="mb-6">
					<Badge variant="info" className="px-3 py-1">
						{cars.length} {cars.length === 1 ? "Vehicle" : "Vehicles"} Available
					</Badge>
				</div>
			)}

			{/* Cars Grid */}
			<CarsGrid cars={cars} reloadCars={loadCars} />
		</div>
	);
}
