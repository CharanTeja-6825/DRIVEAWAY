package com.driveaway.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.driveaway.entity.Car;
import com.driveaway.service.CarService;

public class CarController {
	@Autowired
	private CarService carService;
	
	@GetMapping("/")
	public String carHome() {
		return "This is car root uri";
	}
	
	@PostMapping("/add")
	public String addCar(@RequestBody Car car) {
		return carService.addCar(car);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> allCars() {
		List<Car> cars = carService.allCars();
		if(cars.size() == 0) return ResponseEntity.ok("car list is empty");
		else return ResponseEntity.ok(cars);
	}
	
	@DeleteMapping("/delete/{cid}")
	public String deleteCar(@PathVariable String cid) {
		return carService.deleteCar(cid);
	}
}
