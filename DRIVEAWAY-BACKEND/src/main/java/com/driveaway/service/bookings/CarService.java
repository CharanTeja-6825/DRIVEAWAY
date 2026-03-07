package com.driveaway.service.bookings;

import com.driveaway.entity.analytics.Review;
import com.driveaway.entity.bookings.Car;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {

    @CacheEvict(value = "cars", allEntries = true)
    String addCar(Car car, MultipartFile[] carImages) throws Exception;
    List<Car> allCars();
    List<Car> dealerCars(String dealerId);
    String updateCar(Car car, MultipartFile[] carImages) throws Exception;
    String deleteCar(String carId);
    String updateCarImages(String carId, MultipartFile[] carImages) throws Exception;
    String addReviewCar(Review review);
}
