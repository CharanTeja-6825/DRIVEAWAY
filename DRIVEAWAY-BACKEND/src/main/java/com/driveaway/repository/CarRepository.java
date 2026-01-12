package com.driveaway.repository;

import com.driveaway.entity.Car;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarRepository extends MongoRepository<Car, String> {
    List<Car> findCarsByDealerId(String dealerId);
}
