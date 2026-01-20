import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Button,
	Chip,
	Divider
} from "@mui/material";
import { useAuth } from "../../../shared/hooks/AuthProvider";



export default function BookingsList({ bookings, onCancel }) {

	const { statusColorMap } = useAuth();

	return (
		<div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
			{bookings.map((booking) => (
				<Card key={booking.bookingId} className="shadow-md">
					<CardContent className="space-y-3">

						{/* Header */}
						<div className="flex items-start justify-between gap-2">
							<div className="flex items-center gap-2">
								<Typography variant="h6">
									#{booking._id.slice(-6)}
								</Typography>
								<Chip
									sx={{ backgroundColor: statusColorMap[booking.status], color: "white" }}
									label={booking.status}
									// color={statusColorMap[booking.status]}
									size="small"
								/>
							</div>

							{booking.status === "APPROVED" && (
								<Button
									variant="outlined"
									color="error"
									size="small"
									onClick={() => onCancel(booking.bookingId)}
								>
									Cancel
								</Button>
							)}
						</div>

						<Divider />

						{/* Booking Info */}
						<div className="space-y-1 text-sm">
							<Typography><strong>DealerShip Name:</strong> {booking.dealershipName}</Typography>
							<Typography><strong>Location:</strong> {booking.dealerLocation}</Typography>
							<Typography><strong>Phone:</strong> {booking.dealerPhone}</Typography>
						</div>

						<div className="space-y-1 text-sm">
							<Typography><strong>Vehicle :</strong> {booking.carBrand + " " + booking.carModel}</Typography>
							<Typography><strong>Model Year:</strong> {booking.carYear}</Typography>
						</div>

						<Divider />

						<div className="flex justify-between text-sm">
							<Typography>
								<strong>Start:</strong> {new Date(booking.startDate).toLocaleDateString()}
							</Typography>
							<Typography>
								<strong>End:</strong> {new Date(booking.endDate).toLocaleDateString()}
							</Typography>
						</div>

						<Divider />

						<Typography className="text-right font-semibold text-lg">
							₹{booking.totalAmount}
						</Typography>
					</CardContent>
				</Card>

			))}
		</div>
	);
}
