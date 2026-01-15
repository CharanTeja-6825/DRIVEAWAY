package com.driveaway.controller;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.service.BookingService;
import com.driveaway.service.CarService;
import com.driveaway.service.DealerApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.driveaway.entity.User;
import com.driveaway.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;

	@Autowired
	private DealerApplicationService dealerApplicationService;

	@Autowired
	private CarService carService;

	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/")
	public String chome() {
		return "Hello Customer";
	}

	@GetMapping("/{email}")
	public ResponseEntity<?> getUser(@PathVariable String email){
		User user = customerService.getUserByEmail(email);
		if(user == null) {
			return ResponseEntity.status(404).body("User not found");
		}
		return ResponseEntity.ok(user);
	}

	@PostMapping("/add")
	public ResponseEntity<?> addDealer(@RequestBody DealerRequestDTO dealerRequestDTO){
		String message = dealerApplicationService.submitApplication(dealerRequestDTO);
		return ResponseEntity.status(201).body(message);
	}

	@GetMapping("/status/{id}")
	public ResponseEntity<String> applicationStatus(@PathVariable String id){
		String result = customerService.getApplicationStatus(id);
		if(result.contains("Not Found")) return ResponseEntity.status(404).body(result);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/get/cars")
	public ResponseEntity<?> getAllCars(){
		List<Car> cars = carService.allCars().stream()
											 .filter(car -> car.getCarStatus()
													 			   .equals(BookingStatus.AVAILABLE.toString()))
											 .toList();
		return cars.size() == 0 ?
				ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Cars Found"):
				ResponseEntity.ok(cars);
	}

	@PostMapping("/add/booking")
	public ResponseEntity<String> addBooking(@RequestBody Booking booking){
		String response = bookingService.createBooking(booking);
		if(response.equals("Car Not Found")) return ResponseEntity.status(404).body(response);
		return ResponseEntity.ok(response);
	}

}
