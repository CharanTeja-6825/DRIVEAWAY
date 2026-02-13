package com.driveaway.service;

import com.driveaway.entity.Order;
import com.razorpay.RazorpayException;

public interface OrderService
{
    public Order createOrder(Order order) throws RazorpayException;
    public boolean verifySignature(String orderId, String paymentId, String signature);
}
