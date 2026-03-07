package com.driveaway.repository.bookings;

import com.driveaway.entity.bookings.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CarRepository extends MongoRepository<Car, String>, CarRepositoryCustom {
    List<Car> findCarsByDealerId(String dealerId);
}
