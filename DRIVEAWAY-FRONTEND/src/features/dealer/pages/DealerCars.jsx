import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@mui/material";
import { Car, Calendar, IndianRupee, Hash, Settings, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getCarsByDealer } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { brandsArray } from "../../../shared/constants/brands";
import CarUpdateModal from "../components/CarUpdateModal";

const statusBadgeVariant = {
	AVAILABLE: "success",
	PENDING: "warning",
	BOOKED: "info",
	CANCELLED: "destructive",
	COMPLETED: "secondary",
};

export default function DealerCars() {
	const { user } = useAuth();
	const dealerId = user.userId;
	const navigate = useNavigate();

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

	return (
		<>
			<div className="min-h-screen bg-slate-50/50 px-4 py-6 sm:px-6 md:px-8">
				{/* Page Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-1">
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] shadow-lg shadow-blue-900/25">
							<Car className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold font-[Manrope] text-slate-900 tracking-tight">
								My Cars
							</h1>
							<p className="text-sm text-slate-500 font-[Source_Sans_3]">
								Manage your vehicle inventory
							</p>
						</div>
					</div>
				</div>

				{/* Cars Count Badge */}
				{cars.length > 0 && (
					<div className="mb-6">
						<Badge variant="info" className="px-3 py-1">
							{cars.length} {cars.length === 1 ? "Vehicle" : "Vehicles"}
						</Badge>
					</div>
				)}

				{/* Cars Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{cars.map((car) => (
						<Card
							key={car.carId}
							className="group cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 border-slate-100"
							onClick={() =>
								navigate(`/dealer/car/${car.carId}`, {
									state: { car },
								})
							}
						>
							{/* Car Image */}
							<div className="relative overflow-hidden">
								{car.carImages?.[0] ? (
									<img
										src={car.carImages[0]}
										alt={`${car.brand} ${car.model}`}
										className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
										<Car className="h-16 w-16 text-slate-300" />
									</div>
								)}
								{/* Status Badge */}
								<div className="absolute top-3 right-3">
									<Badge
										variant={statusBadgeVariant[car.carStatus] || "default"}
										className="px-2.5 py-1 text-[11px] uppercase tracking-wider shadow-sm"
									>
										{car.carStatus}
									</Badge>
								</div>
							</div>

							{/* Brand Header */}
							<div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-5 py-4">
								<div className="flex items-center gap-3">
									{getBrandLogo(car.brand) && (
										<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm">
											<img
												src={getBrandLogo(car.brand)}
												alt={car.brand}
												width={28}
												height={28}
												className="object-contain"
											/>
										</div>
									)}
									<div className="flex-1">
										<h3 className="text-base font-bold text-white font-[Manrope] leading-tight">
											{car.brand}
										</h3>
										<p className="text-sm text-white/80 font-[Source_Sans_3]">
											{car.model}
										</p>
									</div>
									{/* Rating Display */}
									{car.rating > 0 && (
										<div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
											<Star className="h-4 w-4 text-amber-400 fill-amber-400" />
											<span className="text-sm font-semibold text-white">
												{car.rating?.toFixed(1)}
											</span>
											<span className="text-xs text-white/70">
												({car.totalRatingsCount || 0})
											</span>
										</div>
									)}
								</div>
							</div>

							<CardContent className="p-5">
								{/* Detail Rows */}
								<div className="space-y-3">
									<div className="flex items-center gap-2.5">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
											<Calendar className="h-4 w-4 text-[#1E3A8A]" />
										</div>
										<div>
											<p className="text-[11px] text-slate-400 font-[Source_Sans_3] leading-tight">Year</p>
											<p className="text-sm font-medium text-slate-700 font-[Source_Sans_3]">{car.year}</p>
										</div>
									</div>

									<div className="h-px bg-slate-100" />

									<div className="flex items-center gap-2.5">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
											<Hash className="h-4 w-4 text-[#1E3A8A]" />
										</div>
										<div>
											<p className="text-[11px] text-slate-400 font-[Source_Sans_3] leading-tight">Car ID</p>
											<p className="text-sm font-medium text-slate-700 font-[Source_Sans_3]">#{car.carId}</p>
										</div>
									</div>
								</div>
							</CardContent>

							<CardFooter className="flex flex-col gap-3 px-5 pb-5 pt-0">
								{/* Price */}
								<div className="w-full rounded-xl bg-amber-50/80 border border-amber-100 p-3 text-center">
									<p className="text-[11px] text-slate-500 font-[Source_Sans_3] mb-0.5">Daily Rate</p>
									<div className="flex items-center justify-center gap-0.5">
										<IndianRupee className="h-5 w-5 text-amber-600" />
										<span className="text-xl font-bold text-amber-600 font-[Manrope] tracking-tight">
											{car.pricePerDay?.toLocaleString("en-IN")}
										</span>
									</div>
								</div>

								{/* Manage Button */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										setSelectedCar(car);
										setModalOpen(true);
									}}
									className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] font-[Manrope] transition-all hover:bg-[#1E3A8A] hover:text-white"
								>
									<Settings className="h-4 w-4" />
									Manage Car
								</button>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* Empty State */}
				{cars.length === 0 && (
					<div className="text-center py-16 px-6">
						<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
							<Car className="h-10 w-10 text-[#1E3A8A] opacity-70" />
						</div>
						<h3 className="text-lg font-semibold text-slate-700 font-[Manrope] mb-2">
							No cars listed yet
						</h3>
						<p className="text-sm text-slate-500 font-[Source_Sans_3]">
							Start by adding your first vehicle to the inventory
						</p>
					</div>
				)}
			</div>

			<CarUpdateModal
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				car={selectedCar}
				reloadCars={loadCars}
				onUpdate={(updatedCar) => {
					setCars(
						cars.map((c) =>
							c.carId === updatedCar.carId ? updatedCar : c
						)
					);
				}}
			/>
		</>
	);
}
