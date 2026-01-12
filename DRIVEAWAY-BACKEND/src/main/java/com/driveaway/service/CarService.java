package com.driveaway.service;

import com.driveaway.entity.Car;

import java.util.List;

public interface CarService {

    public String addCar(Car car);
    public List<Car> allCars();
}
