package com.driveaway.service;

import com.driveaway.DTO.BookingDTO;
import com.driveaway.entity.Booking;

import java.util.List;

public interface BookingService {
    public String createBooking(Booking booking);
    public List<BookingDTO> bookingsByDealer(String dealerId);
    public String validateBooking(String bookingId, boolean approval);
}
