package com.driveaway.service;

import com.driveaway.entity.Booking;

import java.util.List;

public interface BookingService {
    public String createBooking(Booking booking);
    public List<Booking> bookingsByDealer(String dealerId, String carId);
}
