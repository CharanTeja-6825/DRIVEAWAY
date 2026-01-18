package com.driveaway.service;

import com.driveaway.DTO.BookingDTO;
import com.driveaway.DTO.CustomerBookingDTO;
import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.entity.Dealer;
import com.driveaway.entity.User;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.BookingRepository;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
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
    private DealerRepository dealerRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public String createBooking(Booking booking) {

        /// Finding Car using carId as base condition.
        Optional<Car> opcar = carRepository.findById(booking.getCarId());
        if(opcar.isEmpty()) return "Car Not Found";

        Car car = opcar.get();
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

        car.setCarStatus(BookingStatus.PENDING.toString());
        carRepository.save(car);

        /// Calculating and setting the price.
        booking.setTotalAmount(price*days);

        bookingRepository.save(booking);
        return "Booking Successful !";
    }

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

        return approval ? "Booking Approved Successfully" : "Booking Rejected Successfully";
    }

    @Override
    public List<CustomerBookingDTO> bookingsByCustomer(String customerId) {
//        List<Booking> bookings = bookingRepository.findBookingsByCustomerId(customerId);
        List<CustomerBookingDTO> customerBookingDTOS = bookingRepository.findCustomerBookings(customerId);
        return customerBookingDTOS;
    }

    @Override
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

        return "Booking Cancelled Successfully";
    }
}
