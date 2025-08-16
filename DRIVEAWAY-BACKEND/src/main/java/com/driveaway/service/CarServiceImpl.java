package com.driveaway.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Car;
import com.driveaway.repository.CarRepository;

@Service
public class CarServiceImpl implements CarService{
	@Autowired
	private CarRepository repo;
	
	@Override
	public String addCar(Car car) {
		car.setCar_id(UUID.randomUUID().toString().split("-")[0]);
		repo.save(car);
		return car.toString()+"\nBooked Successfully!";
	}

	@Override
	public String deleteCar(String bid) {
		Optional<Car> caropt = repo.findById(bid);
		if(caropt.isPresent()) {
			Car carobj = caropt.get();
			repo.delete(carobj);
			return carobj.getCar_id() + " is deleted successfully!";
		}else {
			return "Car Not Found";
		}
	}

	@Override
	public List<Car> allCars() {
		return repo.findAll();
	}
}
