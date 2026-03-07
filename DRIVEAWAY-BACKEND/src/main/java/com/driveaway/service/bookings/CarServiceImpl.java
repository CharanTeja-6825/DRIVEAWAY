package com.driveaway.service.bookings;

import com.driveaway.entity.analytics.Review;
import com.driveaway.entity.bookings.Car;
import com.driveaway.entity.users.Dealer;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.ReviewRepository;
import com.driveaway.repository.bookings.BookingRepository;
import com.driveaway.repository.bookings.CarRepository;
import com.driveaway.service.integrations.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private BookingRepository bookingRepository;

    @CacheEvict(value = "cars", allEntries = true)
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
    @Cacheable(value = "cars", unless = "#result == null || #result.isEmpty()")
    public List<Car> allCars() {
        return carRepository.findAll();
    }

    @Cacheable(value = "dealer_cars", key = "#dealerId")
    public List<Car> dealerCars(String dealerId){
        return carRepository.findCarsByDealerId(dealerId);
    }

    @Override
    @CacheEvict(value = "cars", allEntries = true)
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
    @CacheEvict(value = "cars", allEntries = true)
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

    @Override
    public String addReviewCar(Review review) {
        Optional<Car> optionalCar = carRepository.findById(review.getCarId());

        if(optionalCar.isEmpty()) return "Car is not found";
        Car car = optionalCar.get();

//      Rating Calculation
        int totalCount = car.getTotalRatingsCount() + 1;
        int totalSum = car.getTotalRatingsSum() + review.getStarRating();
        int updatedRating = totalSum / totalCount;

//      New Rating Update per Car.
        car.setRating(updatedRating);
        car.setTotalRatingsSum(totalSum);
        car.setTotalRatingsCount(totalCount);

//      TIMESTAMP Audit
        review.setCreatedAt(Instant.now());
        review.setUpdatedAt(Instant.now());

//      DB Save
        reviewRepository.save(review);
        carRepository.save(car);
        return "We're as thrilled As you !!";
    }
}
