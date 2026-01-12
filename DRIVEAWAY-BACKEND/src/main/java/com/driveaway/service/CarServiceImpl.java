package com.driveaway.service;

import com.driveaway.entity.Car;
import com.driveaway.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CarServiceImpl implements CarService{

    @Autowired
    private CarRepository carRepository;

    @Override
    public String addCar(Car car) {
        car.setCreatedAt(Instant.now());
        car.setAvailable(true);
        carRepository.save(car);
        return "Car Added Successfully";
    }

    @Override
    public List<Car> allCars() {
        return carRepository.findAll();
    }


}
