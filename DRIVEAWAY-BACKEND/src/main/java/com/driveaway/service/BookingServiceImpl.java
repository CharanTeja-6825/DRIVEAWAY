package com.driveaway.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Booking;
import com.driveaway.repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository repo;
	
	@Override
	public String addBooking(Booking booking) {
		booking.setBooking_id(UUID.randomUUID().toString().split("-")[0]);
		repo.save(booking);
		return booking.toString()+"\nBooked Successfully!";
	}

	@Override
	public String deleteBooking(String bid) {
		Optional<Booking> bookingopt = repo.findById(bid);
		if(bookingopt.isPresent()) {
			Booking bookingobj = bookingopt.get();
			repo.delete(bookingobj);
			return bookingobj.getCustomer().getCustomer_name()+"'s booking cancelled !";
		}else {
			return "Booking Not Found";
		}
	}

	@Override
	public List<Booking> allBookings() {
		return repo.findAll();
	}
}