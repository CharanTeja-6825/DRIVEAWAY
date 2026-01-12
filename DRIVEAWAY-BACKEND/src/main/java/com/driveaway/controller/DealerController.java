package com.driveaway.controller;

import com.driveaway.entity.Car;
import com.driveaway.entity.Dealer;
import com.driveaway.service.CarService;
import com.driveaway.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	private DealerService dealerService;

	@Autowired
	private CarService carService;

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
		return cars.size() == 0 ? ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Cars Found. Add them In the New Car Section."): ResponseEntity.ok(cars);
	}
	
}
