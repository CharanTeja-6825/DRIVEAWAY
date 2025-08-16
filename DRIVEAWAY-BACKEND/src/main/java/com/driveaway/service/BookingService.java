package com.driveaway.service;

import java.util.List;

import com.driveaway.entity.Booking;

public interface BookingService {
	public String addBooking(Booking booking);
	public String deleteBooking(String id);
	public List<Booking> allBookings();
}
