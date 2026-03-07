package com.driveaway.service.integrations;

import com.driveaway.entity.bookings.Booking;
import com.driveaway.entity.bookings.Order;

public interface EmailService {
    void sendBookingApprovedEmail(Booking booking);
    void sendValidationMail(Booking booking, boolean validate);
    void sendCancellationMail(Booking booking);
    void sendPaymentConfirmationMail(Order order);
}
