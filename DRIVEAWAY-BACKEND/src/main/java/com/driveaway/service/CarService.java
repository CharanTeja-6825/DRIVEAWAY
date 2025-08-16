package com.driveaway.service;

import java.util.List;

import com.driveaway.entity.Car;

public interface CarService {
	public String addCar(Car car);
	public List<Car> allCars();
	public String deleteCar(String carid);
}
