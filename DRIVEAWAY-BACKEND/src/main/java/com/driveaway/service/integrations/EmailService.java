package com.driveaway.service.integrations;

import com.driveaway.entity.bookings.Booking;
import com.driveaway.entity.bookings.Order;

public interface EmailService {
    void sendBookingApprovedEmail(Booking booking);
    void sendBookingCreationEmail(Booking booking);
    void sendRejectionMail(Booking booking);
    void sendCancellationMail(Booking booking);
    void sendPaymentConfirmationMail(Order order);

    void sendDealerNewBookingEmail(Booking booking);
    void sendDealerBookingCancelledEmail(Booking booking);
    void sendDealerPaymentReceivedEmail(Order order);
}
