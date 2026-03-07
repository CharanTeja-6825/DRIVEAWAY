package com.driveaway.service;

import com.driveaway.dto.BookingDTO;
import com.driveaway.dto.CustomerBookingDTO;
import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.events.BookingCancelledEvent;
import com.driveaway.events.BookingConfirmedEvent;
import com.driveaway.events.BookingCreatedEvent;
import com.driveaway.events.BookingRejectedEvent;
import com.driveaway.repository.BookingRepository;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private CarRepository carRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    @Caching(evict = {
            @CacheEvict(value = "customer_bookings", key = "#booking.customerId"),
            @CacheEvict(value = "dealer_bookings", key = "#booking.dealerId"),
            @CacheEvict(value = "cars", allEntries = true),
    })
    public String createBooking(Booking booking) {

        /// Finding Car using carId as base condition.
        Optional<Car> optionalCar = carRepository.findById(booking.getCarId());
        if(optionalCar.isEmpty()) return "Car Not Found";

        Car car = optionalCar.get();
        String status = car.getCarStatus();

        ///  Checking for existing status of the car.
        switch (status){
            case "PENDING" : return "Car is reserved try after 15 mins.";
            case "ACTIVE" : return "Car is actively used by customer";
            default : break;
        }

        /// Setting status of Booking, DealerId and timestamp.
        booking.setStatus(BookingStatus.PENDING.toString());
        Instant timestamp = Instant.now();
        booking.setCreatedAt(timestamp);
        booking.setDealerId(car.getDealerId());

        /// Fetching ZoneId of IST => "Asia/Kolkata"
        ZoneId zoneID = ZoneId.of("Asia/Kolkata");

        /// Retrieving starting and ending dates.
        Instant st = booking.getStartDate();
        Instant en = booking.getEndDate();

        /// To work with ChronoUnit we need to convert UTC to IST using LocalDate.
        LocalDate start = st.atZone(zoneID).toLocalDate();
        LocalDate end = en.atZone(zoneID).toLocalDate();

        /// calculation of days between start and end date.
        long days = Math.max(1, ChronoUnit.DAYS.between(start, end));

        double price = car.getPricePerDay();

        /// Updating the car Status to Pending.
        if(car.getCarStatus().equals(BookingStatus.AVAILABLE.toString()))
        car.setCarStatus(BookingStatus.PENDING.toString());
        else return "Car is Already Booked by Someone else please try again.";

        /// Calculating and setting the price.
        booking.setTotalAmount(price*days);

        bookingRepository.save(booking);
        carRepository.save(car);
        BookingCreatedEvent bk = new BookingCreatedEvent(booking);
        applicationEventPublisher.publishEvent(bk);
        return "Booking Successful !";
    }

    @Override
    @Cacheable(key = "#dealerId", value = "dealer_bookings")
    public List<BookingDTO> bookingsByDealer(String dealerId){
        List<Booking> bookings = bookingRepository.findBookingsByDealerId(dealerId);
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        for(Booking booking : bookings){
            bookingDTOS.add(new BookingDTO(
                    booking.getBookingId(),
                    booking.getCarId(),
                    booking.getDealerId(),
                    booking.getCustomerId(),
                    userRepository.findById(booking.getCustomerId()).get(),
                    booking.getStartDate(),
                    booking.getEndDate(),
                    booking.getTotalAmount(),
                    booking.getStatus(),
                    booking.getCreatedAt(),
                    booking.getApprovedAt()));
        }
        return bookingDTOS;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "customer_bookings", allEntries = true),
            @CacheEvict(value = "dealer_bookings", allEntries = true),
            @CacheEvict(value = "cars", allEntries = true),
    })
    public String validateBooking(String bookingId, boolean approval) {

        Optional<Booking> opbook = bookingRepository.findById(bookingId);
        if(opbook.isEmpty()) return "Booking ID not found";

        Booking booking = opbook.get();
        booking.setStatus(approval ? BookingStatus.APPROVED.toString() : BookingStatus.REJECTED.toString());

        Optional<Car> opcar = carRepository.findById(booking.getCarId());
        if(opcar.isEmpty()) return "Car Not Found";

        Car car = opcar.get();
        car.setCarStatus(approval ? BookingStatus.BOOKED.toString() : BookingStatus.AVAILABLE.toString());

        bookingRepository.save(booking);
        carRepository.save(car);

        applicationEventPublisher.publishEvent(booking.getStatus().equals(BookingStatus.APPROVED.toString())
                ? new BookingConfirmedEvent(booking)
                : new BookingRejectedEvent(booking));


        return approval ? "Booking Approved Successfully" : "Booking Rejected Successfully";
    }

    @Override
    @Cacheable(key = "#customerId", value = "customer_bookings")
    public List<CustomerBookingDTO> bookingsByCustomer(String customerId) {
//        List<Booking> bookings = bookingRepository.findBookingsByCustomerId(customerId);
        List<CustomerBookingDTO> customerBookingDTOS = bookingRepository.findCustomerBookings(customerId);
        return customerBookingDTOS;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "customer_bookings", allEntries = true),
            @CacheEvict(value = "dealer_bookings", allEntries = true),
            @CacheEvict(value = "cars", allEntries = true)
    })
    public String cancelBooking(String bookingId) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if(optionalBooking.isEmpty()) return "Booking Not found";
        Booking b = optionalBooking.get();

        if(!b.getStatus().equals(BookingStatus.APPROVED.toString())) return "Booking Not Approved";

        b.setStatus(BookingStatus.CANCELLED.toString());
        Optional<Car> optionalCar = carRepository.findById(b.getCarId());

        if(optionalCar.isEmpty()) return "Car Not Found";
        Car car = optionalCar.get();
        car.setCarStatus(BookingStatus.AVAILABLE.toString());

        bookingRepository.save(b);
        carRepository.save(car);

        applicationEventPublisher.publishEvent(new BookingCancelledEvent(b));

        return "Booking Cancelled Successfully";
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "customer_bookings", allEntries = true),
            @CacheEvict(value = "dealer_bookings", allEntries = true),
            @CacheEvict(value = "cars", allEntries = true)
    })
    public void expirePendingBookings() {
        Instant timeoutDuration = Instant.now().minus(Duration.ofMinutes(5));
        List<Booking> expiredBookings = bookingRepository.findBookingsByCreatedAtLessThan(timeoutDuration);

        if(expiredBookings.size() == 0) return;

        bookingRepository.expirePendingBookings(timeoutDuration);

        List<String> carIds = expiredBookings.stream()
                .map(Booking::getCarId)
                .toList();

        carRepository.unlockCars(carIds);
    }



    @Override
    @Caching(evict = {
            @CacheEvict(value = "customer_bookings", allEntries = true),
            @CacheEvict(value = "dealer_bookings", allEntries = true),
            @CacheEvict(value = "cars", allEntries = true)
    })
    public void updateBookingsAndCars(Instant currentDate) {

        List<String> startCars = bookingRepository.findBookingsByStatusAndStartDateLessThanEqual(
                        BookingStatus.PAID.toString(),
                        currentDate
                )
                .stream()
                .map(Booking::getCarId)
                .toList();

        List<String> endCars = bookingRepository.findBookingsByStatusAndEndDateLessThanEqual(
                        BookingStatus.ACTIVE.toString(),
                        currentDate
                )
                .stream()
                .map(Booking::getCarId)
                .toList();


        bookingRepository.activateBooking(currentDate, startCars);
        bookingRepository.completeBooking(currentDate, endCars);
    }
}
