package com.driveaway.controller;

import com.driveaway.dto.CustomerBookingDTO;
import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.entity.Order;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.service.*;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.driveaway.entity.User;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
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

	@Autowired
	private OrderService orderService;
	
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
				ResponseEntity.status(HttpStatus.ACCEPTED).body("No Cars Found"):
				ResponseEntity.ok(cars);
	}

	@PostMapping("/add/booking")
	public ResponseEntity<String> addBooking(@RequestBody Booking booking){
		String response = bookingService.createBooking(booking);
		if(response.equals("Car Not Found")) return ResponseEntity.status(404).body(response);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/bookings")
	public ResponseEntity<List<CustomerBookingDTO>> customerBookings(@RequestParam String customerId){
		return ResponseEntity.ok(bookingService.bookingsByCustomer(customerId));
	}

	@PostMapping("/cancel/booking")
	public ResponseEntity<String> cancelBooking(@RequestParam String bookingId){
		return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
	}

	@PostMapping("/create/order")
	public ResponseEntity<Order> createPayment(@RequestBody Order order) throws RazorpayException {
		return ResponseEntity.ok(orderService.createOrder(order));
	}

	@PostMapping("/verify")
	public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> paymentDetails){
		String orderId = paymentDetails.get("orderId");
		String paymentId = paymentDetails.get("paymentId");
		String signature = paymentDetails.get("signature");

		return ResponseEntity.ok(orderService.verifySignature(orderId, paymentId, signature) ? "Payment Success" : "Invalid Signature");
	}

}
