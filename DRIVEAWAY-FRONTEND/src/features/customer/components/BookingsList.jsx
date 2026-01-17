import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Button,
	Chip,
	Divider
} from "@mui/material";

export default function BookingsList({ bookings, onCancel }) {
	return (
		<div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
			{bookings.map((booking) => (
				<Card key={booking.bookingId} className="relative shadow-md">

					{/* Cancel Button */}
					{booking.status === "APPROVED" && (
						<Button
							variant="outlined"
							color="error"
							size="small"
							className="!absolute top-3 right-3"
							onClick={() => onCancel(booking.bookingId)}
						>
							Cancel
						</Button>
					)}

					<CardContent className="space-y-3">
						{/* Header */}
						<div className="flex justify-between items-center">
							<Typography variant="h6">
								{booking.dealer.dealershipName}
							</Typography>
							<Chip
								label={booking.status}
								color={booking.status === "APPROVED" ? "success" : "warning"}
								size="small"
							/>
						</div>

						<Divider />

						{/* Booking Info */}
						<div className="space-y-1 text-sm">
							<Typography>
								<strong>DealerShip Name:</strong> {booking.dealer.dealershipName}
							</Typography>
							<Typography>
								<strong>Owner:</strong> {booking.dealer.ownerName}
							</Typography>
							<Typography>
								<strong>Location:</strong> {booking.dealer.location}
							</Typography>
							<Typography>
								<strong>GST:</strong> {booking.dealer.gstIn}
							</Typography>
							<Typography>
								<strong>Phone :</strong> {booking.dealer.phone}
							</Typography>
						</div>

						<Divider />

						{/* Dates */}
						<div className="flex justify-between text-sm">
							<Typography>
								<strong>Start:</strong>{" "}
								{new Date(booking.startDate).toLocaleDateString()}
							</Typography>
							<Typography>
								<strong>End:</strong>{" "}
								{new Date(booking.endDate).toLocaleDateString()}
							</Typography>
						</div>

						<Divider />

						{/* Amount */}
						<Typography className="text-right font-semibold text-lg">
							₹{booking.totalAmount}
						</Typography>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
