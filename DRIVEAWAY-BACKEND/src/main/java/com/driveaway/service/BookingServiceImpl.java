package com.driveaway.service;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.BookingRepository;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public String createBooking(Booking booking) {

        // Setting status of Booking and timestamp.
        booking.setStatus(BookingStatus.PENDING.toString());
        Instant timestamp = Instant.now();
        booking.setCreatedAt(timestamp);

        // Fetching ZoneId of IST => "Asia/Kolkata"
        ZoneId zoneID = ZoneId.of("Asia/Kolkata");

        // Retrieving starting and ending dates.
        Instant st = booking.getStartDate();
        Instant en = booking.getEndDate();

        // To work with ChronoUnit we need to convert UTC to IST using LocalDate.
        LocalDate start = st.atZone(zoneID).toLocalDate();
        LocalDate end = en.atZone(zoneID).toLocalDate();

        // calculation of days between start and end date.
        long days = Math.max(1, ChronoUnit.DAYS.between(start, end));

        Optional<Car> opcar = carRepository.findById(booking.getCarId());
        if(opcar.isEmpty()) return "Car Not Found";

        double price = opcar.get().getPricePerDay();

        // Calculating and setting the price.
        booking.setTotalAmount(price*days);

        bookingRepository.save(booking);
        return "Booking Successful !";
    }

    public List<Booking> bookingsByDealer(String dealerId, String carId){
        return bookingRepository.findBookingsByDealerIdAndCarId(dealerId, carId);
    }
}
