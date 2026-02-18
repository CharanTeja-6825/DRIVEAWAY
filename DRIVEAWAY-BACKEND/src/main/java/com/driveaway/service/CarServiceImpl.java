package com.driveaway.service;

import com.driveaway.entity.Car;
import com.driveaway.entity.Dealer;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.DealerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService{

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public String addCar(Car car, MultipartFile[] carImages) throws Exception {
        Optional<Dealer> opd = dealerRepository.findById(car.getDealerId());
        if(opd.isEmpty()) return "Dealer not found";
        List<String> carImageUrls = cloudinaryService.uploadCarImages(car.getCarId(), carImages);
        Dealer d = opd.get();
        car.setCarImages(carImageUrls);
        car.setDealerShipName(d.getDealershipName());
        car.setCreatedAt(Instant.now());
        car.setCarStatus(BookingStatus.AVAILABLE.toString());
        carRepository.save(car);
        return "Car Added Successfully "+d.getDealershipName();
    }

    @Override
    public List<Car> allCars() {
        return carRepository.findAll();
    }

    public List<Car> dealerCars(String dealerId){
        return carRepository.findCarsByDealerId(dealerId);
    }

    @Override
    public String updateCar(Car car, MultipartFile[] carImages) throws Exception {
        String result = carRepository.updateCar(car);
        if (result.equals("Car Not Found")) return result;
        if (carImages != null && carImages.length > 0) {
            List<String> imageUrls = cloudinaryService.uploadCarImages(car.getCarId(), carImages);
            Optional<Car> carOptional = carRepository.findById(car.getCarId());
            if (carOptional.isPresent()) {
                Car existingCar = carOptional.get();
                existingCar.setCarImages(imageUrls);
                carRepository.save(existingCar);
            }
        }
        return result;
    }

    @Override
    public String deleteCar(String carId) {
        carRepository.deleteById(carId);
        return "Car Deleted Successfully";
    }

    @Override
    public String updateCarImages(String carId, MultipartFile[] carImages) throws Exception {
        Optional<Car> carOptional = carRepository.findById(carId);
        if(carOptional.isEmpty()) return "Car Not Found";
        List<String> cars = cloudinaryService.uploadCarImages(carId, carImages);
        Car car = carOptional.get();
        car.setCarImages(cars);
        carRepository.save(car);
        return "Car Images Updated Successfully !";
    }
}
