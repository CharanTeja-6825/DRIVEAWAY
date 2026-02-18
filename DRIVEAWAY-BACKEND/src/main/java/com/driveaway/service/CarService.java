package com.driveaway.service;

import com.driveaway.entity.Car;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {

    public String addCar(Car car, MultipartFile[] carImages) throws Exception;
    public List<Car> allCars();
    public List<Car> dealerCars(String dealerId);
    public String updateCar(Car car, MultipartFile[] carImages) throws Exception;
    public String deleteCar(String carId);
    public String updateCarImages(String carId, MultipartFile[] carImages) throws Exception;
}
