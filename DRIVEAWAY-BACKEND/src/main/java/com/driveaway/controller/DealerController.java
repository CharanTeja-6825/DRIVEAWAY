package com.driveaway.controller;

import com.driveaway.dto.BookingDTO;
import com.driveaway.entity.Car;
import com.driveaway.service.BookingService;
import com.driveaway.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dealer")
@CrossOrigin("*")
@PreAuthorize("hasRole('DEALER')")
public class DealerController {

	@Autowired
	private CarService carService;
    @Autowired
    private BookingService bookingService;

	@GetMapping("/")
	public String dealerHome() {
		return "Dealer Home";
	}

	@PostMapping("/add/car")
	public ResponseEntity<String> addCar(@RequestBody Car car){
		String response = carService.addCar(car);
		return ResponseEntity.status(201).body(response);
	}

	@GetMapping("/cars/{dealerId}")
	public ResponseEntity<?> dealerCars(@PathVariable String dealerId){
		List<Car> cars = carService.dealerCars(dealerId);
		return cars.size() == 0 ? ResponseEntity.status(200).body("No Cars Found. Add them In the New Car Section."): ResponseEntity.ok(cars);
	}

	@PatchMapping("/update/car")
	public ResponseEntity<String> editCar(@RequestBody Car car){
		String response = carService.updateCar(car);
		if(response.equals("Car Not Found")) return ResponseEntity.status(404).body(response);
		else return ResponseEntity.ok(response);
	}

	@GetMapping("/get/bookings")
	public ResponseEntity<?> dealerBookings(@RequestParam String dealerId){
		List<BookingDTO> bookings = bookingService.bookingsByDealer(dealerId);
		if(bookings.size() == 0) return ResponseEntity.ok("No Bookings under your dealership");
		return ResponseEntity.ok(bookings);
	}

	@PutMapping("/approve/booking/{bookingId}")
	public ResponseEntity<String> approveBooking(@PathVariable String bookingId, @RequestParam boolean approval){
		String response = bookingService.validateBooking(bookingId, approval);
		return ResponseEntity.ok(response);
	}
	
}
