package com.driveaway.controller;

import com.driveaway.dto.BookingDTO;
import com.driveaway.entity.Car;
import com.driveaway.service.BookingService;
import com.driveaway.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/dealer")
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

	@PostMapping(value = "/add/car", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> addCar(@RequestPart("car") Car car, @RequestPart("images") MultipartFile[] images) throws Exception {
		String response = carService.addCar(car, images);
		return ResponseEntity.status(201).body(response);
	}

	@GetMapping("/cars/{dealerId}")
	public ResponseEntity<?> dealerCars(@PathVariable String dealerId){
		List<Car> cars = carService.dealerCars(dealerId);
		return cars.size() == 0 ? ResponseEntity.status(200).body("No Cars Found. Add them In the New Car Section."): ResponseEntity.ok(cars);
	}

	@PutMapping("/update/car")
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

	@PutMapping("/update/car-images")
	public ResponseEntity<String> addCarImages(@RequestParam String carId, @RequestPart MultipartFile[] carImages) throws Exception {
		try{
			String response = carService.updateCarImages(carId, carImages);
			return ResponseEntity.ok(response);
		}catch(Exception e){
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}
	
}
