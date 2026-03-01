import { useState } from "react";
import Button from "@mui/material/Button";
import { createOrder, verfiyOrder } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";
import { Toaster } from "sonner";
import { toast } from "sonner";

function PaymentButton({ booking, reloadBookings }) {
  const { user, email } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const order = {
        customer_id: user.userId,
        booking_id: booking._id,
        amount: booking.totalAmount,
      };

      const { data } = await createOrder(order);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.order_id,
        name: "Driveaway ",
        handler: async function (response) {
          const { data } = await verfiyOrder(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
          );

          // alert(data);
          toast.info(data);
          reloadBookings();
        },
        prefill: {
          email: JSON.stringify(email),
        },
        theme: {
          color: "#3370cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: '"Source Sans 3", sans-serif',
            borderRadius: "12px",
          },
          className: "driveaway-toast",
        }}
      />
      <Button
        variant="contained"
        size="small"
        disableElevation
        onClick={handlePayment}
        disabled={isProcessing}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "999px",
          px: 2.5,
          py: 0.75,
          bgcolor: "secondary.main",
          "&:hover": {
            bgcolor: "secondary.dark",
          },
        }}
      >
        {isProcessing
          ? "Processing…"
          : `Pay ₹${booking.totalAmount.toLocaleString("en-IN")}`}
      </Button>
    </div>
  );
}

export default PaymentButton;
