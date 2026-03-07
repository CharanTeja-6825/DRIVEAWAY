package com.driveaway.repository.bookings;

import com.driveaway.entity.bookings.Car;

import java.util.List;

public interface CarRepositoryCustom {
    void unlockCars(List<String> cars);
    String updateCar(Car car);
}
