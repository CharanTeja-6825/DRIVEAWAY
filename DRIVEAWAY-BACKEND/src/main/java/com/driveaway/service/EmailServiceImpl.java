package com.driveaway.service;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.entity.User;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.UserRepository;
import org.apache.http.client.methods.HttpHead;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.Serializable;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService{

    @Value("${spring.brevo.api}")
    private String mailApiKey;

    private final String url = "https://api.brevo.com/v3/smtp/email";

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Override
    public void sendBookingApprovedEmail(Booking booking) {

        User user = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        // Defining Context For Spring Thymeleaf Template
        Context context = getContext(booking, user, car);

        // Setting Thymeleaf Variable using the Map properties
        String htmlContent = springTemplateEngine.process("booking-creation", context);

        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set("api-key", mailApiKey);

    }

    private static @NonNull Context getContext(Booking booking, User user, Car car) {
        Context context = new Context();

        // Defining the Properties of the Map
        Map<String, Object> variables = Map.of(
                "name", user.getUserName(),
                "bookingId", booking.getBookingId(),
                "carName", car.getBrand()+" "+ car.getModel(),
                "startDate", booking.getStartDate(),
                "endDate", booking.getEndDate(),
                "totalAmount", booking.getTotalAmount()
        );
        context.setVariables(variables);
        return context;
    }
}
