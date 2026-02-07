import { useState } from "react";
import { createOrder, verfiyOrder } from "../services";
import { useAuth } from "../../../shared/hooks/AuthProvider";

function PaymentButton({ booking }) {

    const { user, email } = useAuth();
    const handlePayment = async () => {

    const order = {
      customer_id: user.userId,
      booking_id: booking._id,
      amount: booking.totalAmount,
    };

    console.log(order);

    // 1️⃣ Create order from backend
    const { data } = await createOrder(order);

    const options = {
      key: "rzp_test_SCu3haj61UyuTF",
      amount: data.amount,
      currency: "INR",
      order_id: data.order_id,
      name: "Driveaway ",

      handler: async function (response) {
        // 5️⃣ Send payment verification data to backend
        const { data } = await verfiyOrder(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
        );

        alert(data);
      },
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "email": JSON.stringify(email), 
        },

      theme: {
        color: "#3370cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay</button>;
}

export default PaymentButton;
