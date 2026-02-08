import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import { validateBooking } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";

const BookingsGrid = ({ bookings = [], setMessage, setError, setLoading }) => {
	
  const { getStatusLabel, statusColorMap } = useAuth();

  const handleApproval = async (bookingId, approval) => {
    try {
      const { data } = await validateBooking(bookingId, approval);
      setMessage(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      {bookings.map((b) => (
        <Card
          key={b.bookingId}
          className="shadow-lg border border-gray-200 rounded-2xl"
        >
          <CardContent className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="font-semibold">
                Booking #{b.bookingId.slice(-6)}
              </Typography>
              <Chip
                label={getStatusLabel(b.status)}
                size="small"
                sx={{
                  bgcolor: statusColorMap[b.status],
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
            </div>

            <Divider />

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Car ID</p>
                <p className="font-medium">{b.carId}</p>
              </div>

              <div>
                <p className="text-gray-500">Customer ID</p>
                <p className="font-medium">{b.customerId}</p>
              </div>

              <div>
                <p className="text-gray-500">Customer Name</p>
                <p className="font-medium">{b.user.userName}</p>
              </div>

              <div>
                <p className="text-gray-500">Customer Phone</p>
                <p className="font-medium">{b.user.userPhone}</p>
              </div>

              <div>
                <p className="text-gray-500">Start Date</p>
                <p className="font-medium">
                  {new Date(b.startDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500">End Date</p>
                <p className="font-medium">
                  {new Date(b.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <Typography className="text-gray-600">Total Amount</Typography>
              <Typography variant="h6" className="font-bold">
                ₹{b.totalAmount}
              </Typography>
            </div>

            {/* Actions */}
            {b.status === "PENDING" && (
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outlined"
                  color="error"
                  className="rounded-xl"
                  onClick={() => {
                    handleApproval(b.bookingId, false);
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  className="rounded-xl"
                  onClick={() => {
                    handleApproval(b.bookingId, true);
                  }}
                >
                  Approve
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsGrid;
