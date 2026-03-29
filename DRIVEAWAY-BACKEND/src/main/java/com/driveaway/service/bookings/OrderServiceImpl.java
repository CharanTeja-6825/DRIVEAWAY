package com.driveaway.service.bookings;

import com.driveaway.entity.bookings.Booking;
import com.driveaway.entity.bookings.Order;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.events.BookingPaidEvent;
import com.driveaway.exception.BookingNotFoundException;
import com.driveaway.repository.bookings.BookingRepository;
import com.driveaway.repository.bookings.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Value("${razorpay.secret}")
    private String razorPaySecret;

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    public Order createOrder(Order order) throws RazorpayException {
        JSONObject jsonOrder = new JSONObject();

        int normalAmount = order.getAmount();
        order.setAmount(normalAmount * 100);

        jsonOrder.put("amount", order.getAmount());
        jsonOrder.put("currency", "INR");
        jsonOrder.put("receipt", order.getBooking_id());

        com.razorpay.Order razpOrder = razorpayClient.orders.create(jsonOrder);

        order.setOrder_id(razpOrder.get("id"));
        order.setStatus(razpOrder.get("status"));
        order.setCreatedAt(Instant.now());
        order.setUpdatedAt(order.getCreatedAt());

        orderRepository.save(order);

        return order;
    }

    @Override
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        String generatedSign = "";
        boolean valid = false;
        try{
            generatedSign = Utils.getHash(orderId + "|" + paymentId, razorPaySecret);

            valid = generatedSign.equals(signature);

            if(valid){
                Optional<Order> optionalOrder = orderRepository.findById(orderId);
                if(optionalOrder.isEmpty()) throw new RazorpayException("Order not found");
                Order order = optionalOrder.get();

                // Fetching Order from RazorPay API
                com.razorpay.Order razpOrder = razorpayClient.orders.fetch(orderId);

                // Updating Order in DB
                order.setStatus(razpOrder.get("status"));

                // Updating Booking document
                Optional<Booking> optionalBooking = bookingRepository.findById(order.getBooking_id());
                if(optionalBooking.isEmpty()) throw new BookingNotFoundException(order.getBooking_id() + " not found");
                Booking booking = optionalBooking.get();

                booking.setStatus(BookingStatus.PAID.toString());
                order.setPayment_id(paymentId);
                order.setUpdatedAt(Instant.now());

                // DB Save
                bookingRepository.save(booking);
                orderRepository.save(order);

                applicationEventPublisher.publishEvent(new BookingPaidEvent(order));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return valid;
    }
}
