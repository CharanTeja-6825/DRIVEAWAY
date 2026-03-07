package com.driveaway.service;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Order;

public interface EmailService {
    void sendBookingApprovedEmail(Booking booking);
    void sendValidationMail(Booking booking, boolean validate);
    void sendCancellationMail(Booking booking);
    void sendPaymentConfirmationMail(Order order);
}
