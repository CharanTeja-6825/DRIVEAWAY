package com.driveaway.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.Booking;
import com.driveaway.service.BookingService;

@RestController
@CrossOrigin("*")
@RequestMapping("/booking")
public class BookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/")
	public String bookingHome() {
		return "this is booking root uri";
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> allBookings(){
		List<Booking> bookings = bookingService.allBookings();
		if(bookings.size() == 0) return ResponseEntity.ok("No Bookings yet.");
		else return ResponseEntity.ok(bookings);
	}
	
	@PostMapping("/add")
	public String addBooking(@RequestBody Booking booking) {
		return bookingService.addBooking(booking);
	}
	
	@DeleteMapping("/delete/{bid}")
	public String deleteBooking(@PathVariable String bid) {
		return bookingService.deleteBooking(bid);
	}
	
}
