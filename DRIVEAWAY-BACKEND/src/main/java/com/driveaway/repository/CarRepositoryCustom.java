package com.driveaway.repository;

import com.driveaway.entity.Car;

import java.util.List;

public interface CarRepositoryCustom {
    void unlockCars(List<String> cars);
    String updateCar(Car car);
}
