package com.driveaway.service;

import com.driveaway.dto.BookingDTO;
import com.driveaway.dto.CustomerBookingDTO;
import com.driveaway.entity.Booking;

import java.time.Instant;
import java.util.List;

public interface BookingService {
    String createBooking(Booking booking);
    List<BookingDTO> bookingsByDealer(String dealerId);
    String validateBooking(String bookingId, boolean approval);
    List<CustomerBookingDTO> bookingsByCustomer(String customerId);
    String cancelBooking(String BookingId);
    void expirePendingBookings();
    void updateBookingsAndCars(Instant currentDate);
}
