package com.driveaway.service;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.entity.User;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.UserRepository;
import org.apache.http.entity.BasicHttpEntity;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService{

    @Value("${spring.brevo.api}")
    private String mailApiKey;

    @Value("${spring.brevo.sender}")
    private String senderEmail;

    @Autowired
    private RestTemplate restTemplate;

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

        /// Defining Context For Spring Thymeleaf Template
        Context context = getContext(booking, user, car);

        /// Setting Thymeleaf Variable using the Map properties
        String htmlContent = springTemplateEngine.process("booking-creation", context);

        /// Headers of Mail Request
        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set("api-key", mailApiKey);

        /// Sender Details
        HttpEntity<Map<String, Object>> request = getMapHttpEntity(user, htmlContent, httpHeaders);

        /// Sending POST using RestTemplate
        ResponseEntity<?> response = restTemplate.postForEntity(
                url,
                request,
                String.class
        );

        System.out.println(response.getStatusCode());
        System.out.println(response.getBody().toString());
    }

    private HttpEntity<Map<String, Object>> getMapHttpEntity(User user, String htmlContent, HttpHeaders httpHeaders) {
        Map<String, Object> sender = new HashMap<>();
        sender.put("name", "Driveaway");
        sender.put("email", senderEmail);
        List<Map<String, Object>> recipients = new ArrayList<>();
        Map<String, Object> recipient = new HashMap<>();
        recipient.put("name", user.getUserName());
        recipient.put("email", user.getUserEmail());
        recipients.add(recipient);

        /// Body of the Mail
        Map<String, Object> body = new HashMap<>();
        body.put("sender", sender);
        body.put("to", recipients);
        body.put("subject", "Booking Confirmation Status");
        body.put("htmlContent", htmlContent);

        /// Sending Request.
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, httpHeaders);
        return request;
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
