package com.driveaway.service;

import com.driveaway.entity.Order;
import com.driveaway.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Value("${razorpay.secret}")
    private String razorPaySecret;

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private OrderRepository orderRepository;

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

        orderRepository.save(order);

        return order;
    }

    @Override
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        String generatedSign = "";
        try{
            generatedSign = Utils.getHash(orderId + "|" + paymentId, razorPaySecret);
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
        return generatedSign.equals(signature);
    }
}
