package com.driveaway.service;

import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    private RazorpayClient razorpayClient;

    @Override
    public String createPayment(int amount) {
        JSONObject payment = new JSONObject();
        payment.put("amount", amount * 100);
        payment.put("currency", "INR");
        return "";
    }
}
