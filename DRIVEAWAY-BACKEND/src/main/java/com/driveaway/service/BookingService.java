package com.driveaway.service;

import com.driveaway.DTO.BookingDTO;
import com.driveaway.records.CustomerBookingDTO;
import com.driveaway.entity.Booking;

import java.time.Instant;
import java.util.List;

public interface BookingService {
    public String createBooking(Booking booking);
    public List<BookingDTO> bookingsByDealer(String dealerId);
    public String validateBooking(String bookingId, boolean approval);
    public List<CustomerBookingDTO> bookingsByCustomer(String customerId);
    public String cancelBooking(String BookingId);
    public void expirePendingBookings();
    public void updateBookingsAndCars(Instant currentDate);
}
