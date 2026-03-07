package com.driveaway.controller;

import com.driveaway.dto.CustomerBookingDTO;
import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.analytics.Review;
import com.driveaway.entity.bookings.Booking;
import com.driveaway.entity.bookings.Car;
import com.driveaway.entity.bookings.Order;
import com.driveaway.entity.users.User;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.service.analytics.DealerApplicationService;
import com.driveaway.service.analytics.ReviewService;
import com.driveaway.service.bookings.BookingService;
import com.driveaway.service.bookings.CarService;
import com.driveaway.service.bookings.OrderService;
import com.driveaway.service.users.CustomerService;
import com.driveaway.service.users.UserService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    private UserService userService;
    @Autowired
    private ReviewService reviewService;

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
				ResponseEntity.status(HttpStatus.OK).body("No Cars Found"):
				ResponseEntity.ok(cars);
	}

	@PostMapping("/add/booking")
	public ResponseEntity<String> addBooking(@RequestBody Booking booking){
		String response = bookingService.createBooking(booking);
		if(response.equals("Car Not Found")) return ResponseEntity.status(404).body(response);
		return ResponseEntity.status(201).body(response);
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
		return ResponseEntity.status(201).body(orderService.createOrder(order));
	}

	@PostMapping("/verify")
	public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> paymentDetails){
		String orderId = paymentDetails.get("orderId");
		String paymentId = paymentDetails.get("paymentId");
		String signature = paymentDetails.get("signature");

		return ResponseEntity.ok(orderService.verifySignature(orderId, paymentId, signature) ? "Payment Success" : "Invalid Signature");
	}

	@PostMapping("/profile")
	public ResponseEntity<String> updateProfileImage(@RequestParam String userId, @RequestPart MultipartFile profileImage) throws Exception {
		return ResponseEntity.ok(userService.updateProfileImage(userId, profileImage));
	}

	@PostMapping("/review")
	public ResponseEntity<String> addReview(@RequestBody Review review){
		return ResponseEntity.status(201).body(carService.addReviewCar(review));
	}

	@GetMapping("/reviews/{carId}")
	public ResponseEntity<List<Review>> getReviewsByCar(@PathVariable String carId){
		return ResponseEntity.ok(reviewService.getReviewsByCar(carId));
	}

}
