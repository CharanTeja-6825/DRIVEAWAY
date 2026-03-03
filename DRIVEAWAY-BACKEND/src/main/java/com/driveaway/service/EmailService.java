package com.driveaway.service;

import com.driveaway.entity.Booking;

public interface EmailService {
    void sendBookingApprovedEmail(Booking booking);
}
