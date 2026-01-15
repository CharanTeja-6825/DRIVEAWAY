package com.driveaway.service;

import com.driveaway.entity.Car;
import com.driveaway.entity.Dealer;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.DealerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public String addCar(Car car) {
        Optional<Dealer> opd = dealerRepository.findById(car.getDealerId());
        if(opd.isEmpty()) return "Dealer not found";
        Dealer d = opd.get();
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
    public String updateCar(Car car) {
        Optional<Car> opcar = carRepository.findById(car.getCarId());
        if(opcar.isEmpty()) return "Car Not Found";
        Car c = opcar.get();
        c.setBrand(car.getBrand());
        c.setYear(car.getYear());
        c.setModel(car.getModel());
        c.setPricePerDay(car.getPricePerDay());
        c.setCarStatus(BookingStatus.AVAILABLE.toString());
        c.setCreatedAt(Instant.now());
        carRepository.save(c);
        return "Car Data Updated";
    }

    @Override
    public String deleteCar(String carId) {
        carRepository.deleteById(carId);
        return "Car Deleted Successfully";
    }
}
