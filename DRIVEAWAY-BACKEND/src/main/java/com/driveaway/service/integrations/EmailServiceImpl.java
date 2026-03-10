package com.driveaway.service.integrations;

import com.driveaway.entity.bookings.Booking;
import com.driveaway.entity.bookings.Car;
import com.driveaway.entity.bookings.Order;
import com.driveaway.entity.users.Dealer;
import com.driveaway.entity.users.User;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.bookings.BookingRepository;
import com.driveaway.repository.bookings.CarRepository;
import com.driveaway.repository.users.UserRepository;
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
public class EmailServiceImpl implements EmailService {

    @Value("${spring.brevo.api}")
    private String mailApiKey;

    @Value("${spring.brevo.sender}")
    private String senderEmail;

    @Autowired
    private RestTemplate restTemplate;

    private final String url = "https://api.brevo.com/v3/smtp/email";
    private final String apiHeader = "api-key";

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private DealerRepository dealerRepository;

    @Override
    public void sendBookingApprovedEmail(Booking booking) {
        User user = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        /// Defining Context For Spring Thymeleaf Template
        Context context = getContext(booking, user, car);

        /// Setting Thymeleaf Variable using the Map properties
        String htmlContent = springTemplateEngine.process("customer/booking-confirmation", context);

        /// Headers of Mail Request
        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set(apiHeader, mailApiKey);

        /// Sender Details
        HttpEntity<Map<String, Object>> request = getMapHttpEntity(user, htmlContent, httpHeaders);

        /// Sending POST using RestTemplate
        restTemplate.postForEntity(
                url,
                request,
                String.class
        );
    }

    @Override
    public void sendBookingCreationEmail(Booking booking) {
        User user = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        /// Defining Context For Spring Thymeleaf Template
        Context context = getContext(booking, user, car);

        /// Setting Thymeleaf Variable using the Map properties
        String htmlContent = springTemplateEngine.process("customer/booking-creation", context);

        /// Headers of Mail Request
        HttpHeaders httpHeaders = new org.springframework.http.HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set(apiHeader, mailApiKey);

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


    @Override
    public void sendRejectionMail(Booking booking) {
        User user = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        /// Defining Context For Spring Thymeleaf Template
        Context context = getContext(booking, user, car);

        /// Setting Thymeleaf Variable using the Map properties
        String htmlContent = springTemplateEngine.process("customer/booking-rejection", context);

        /// Headers of Mail Request
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set(apiHeader, mailApiKey);

        /// Sender Details
        HttpEntity<Map<String, Object>> request = getMapHttpEntity(user, htmlContent, httpHeaders);

        /// Sending POST using RestTemplate
        restTemplate.postForEntity(
                url,
                request,
                String.class
        );

    }


    @Override
    public void sendCancellationMail(Booking booking) {
        User user = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        /// Defining Context For Spring Thymeleaf Template
        Context context = getContext(booking, user, car);

        /// Setting Thymeleaf Variable using the Map properties
        String htmlContent = springTemplateEngine.process("customer/booking-cancellation", context);

        /// Headers of Mail Request
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.set(apiHeader, mailApiKey);

        /// Sender Details
        HttpEntity<Map<String, Object>> request = getMapHttpEntity(user, htmlContent, httpHeaders);

        /// Sending POST using RestTemplate
        restTemplate.postForEntity(
                url,
                request,
                String.class
        );

    }


    @Override
    public void sendPaymentConfirmationMail(Order order) {
        User user = userRepository.findById(order.getCustomer_id()).orElseThrow();
        Booking booking = bookingRepository.findById(order.getBooking_id()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        Context paymentContext = getContext(booking, user, car, order);

        String htmlContent = springTemplateEngine.process("customer/booking-paid", paymentContext);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(apiHeader, mailApiKey);

        HttpEntity<Map<String, Object>> mapHttpEntity = getMapHttpEntity(user, htmlContent, headers);

        restTemplate.postForEntity(
                url,
                mapHttpEntity,
                String.class
        );
    }

    @Override
    public void sendDealerNewBookingEmail(Booking booking) {
        Dealer dealer = dealerRepository.findById(booking.getDealerId()).orElseThrow();
        User dealerUser = userRepository.findById(dealer.getUser()).orElseThrow();
        User customer = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        Context context = getDealerContext(booking, dealer, customer, car);
        String htmlContent = springTemplateEngine.process("dealer/new-booking-request", context);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(apiHeader, mailApiKey);

        HttpEntity<Map<String, Object>> request = getMapHttpEntity(
                dealerUser.getUserName(), dealerUser.getUserEmail(),
                "New Booking Request – Action Required", htmlContent, headers);

        restTemplate.postForEntity(url, request, String.class);
    }

    @Override
    public void sendDealerBookingCancelledEmail(Booking booking) {
        Dealer dealer = dealerRepository.findById(booking.getDealerId()).orElseThrow();
        User dealerUser = userRepository.findById(dealer.getUser()).orElseThrow();
        User customer = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        Context context = getDealerContext(booking, dealer, customer, car);
        String htmlContent = springTemplateEngine.process("dealer/booking-cancelled", context);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(apiHeader, mailApiKey);

        HttpEntity<Map<String, Object>> request = getMapHttpEntity(
                dealerUser.getUserName(), dealerUser.getUserEmail(),
                "Booking Cancelled – " + car.getBrand() + " " + car.getModel(), htmlContent, headers);

        restTemplate.postForEntity(url, request, String.class);
    }

    @Override
    public void sendDealerPaymentReceivedEmail(Order order) {
        Booking booking = bookingRepository.findById(order.getBooking_id()).orElseThrow();
        Dealer dealer = dealerRepository.findById(booking.getDealerId()).orElseThrow();
        User dealerUser = userRepository.findById(dealer.getUser()).orElseThrow();
        User customer = userRepository.findById(booking.getCustomerId()).orElseThrow();
        Car car = carRepository.findById(booking.getCarId()).orElseThrow();

        Context context = getDealerPaymentContext(booking, dealer, customer, car, order);
        String htmlContent = springTemplateEngine.process("dealer/payment-received", context);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(apiHeader, mailApiKey);

        HttpEntity<Map<String, Object>> request = getMapHttpEntity(
                dealerUser.getUserName(), dealerUser.getUserEmail(),
                "Payment Received – ₹" + booking.getTotalAmount(), htmlContent, headers);

        restTemplate.postForEntity(url, request, String.class);
    }

    // ── Helper: Build Brevo API request for customer emails ──

    private HttpEntity<Map<String, Object>> getMapHttpEntity(User user, String htmlContent, HttpHeaders httpHeaders) {
        return getMapHttpEntity(user.getUserName(), user.getUserEmail(),
                "Booking Confirmation Status", htmlContent, httpHeaders);
    }

    // ── Helper: Build Brevo API request with explicit recipient and subject ──

    private HttpEntity<Map<String, Object>> getMapHttpEntity(
            String recipientName, String recipientEmail, String subject,
            String htmlContent, HttpHeaders httpHeaders) {

        Map<String, Object> sender = new HashMap<>();
        sender.put("name", "Driveaway");
        sender.put("email", senderEmail);

        Map<String, Object> recipient = new HashMap<>();
        recipient.put("name", recipientName);
        recipient.put("email", recipientEmail);

        List<Map<String, Object>> recipients = new ArrayList<>();
        recipients.add(recipient);

        Map<String, Object> body = new HashMap<>();
        body.put("sender", sender);
        body.put("to", recipients);
        body.put("subject", subject);
        body.put("htmlContent", htmlContent);

        return new HttpEntity<>(body, httpHeaders);
    }

    // ── Context builders for customer emails ──

    private static @NonNull Context getContext(Booking booking, User user, Car car) {
        Context context = new Context();
        Map<String, Object> variables = Map.of(
                "name", user.getUserName(),
                "bookingId", booking.getBookingId(),
                "carName", car.getBrand() + " " + car.getModel(),
                "startDate", booking.getStartDate().toString().substring(0, 10),
                "endDate", booking.getEndDate().toString().substring(0, 10),
                "totalAmount", booking.getTotalAmount()
        );
        context.setVariables(variables);
        return context;
    }

    private static @NonNull Context getContext(Booking booking, User user, Car car, Order order) {
        Context context = new Context();
        Map<String, Object> variables = Map.of(
                "name", user.getUserName(),
                "bookingId", booking.getBookingId(),
                "carName", car.getBrand() + " " + car.getModel(),
                "startDate", booking.getStartDate().toString().substring(0, 10),
                "endDate", booking.getEndDate().toString().substring(0, 10),
                "totalAmount", booking.getTotalAmount(),
                "paymentStatus", order.getStatus(),
                "orderId", order.getOrder_id(),
                "paymentId", order.getPayment_id(),
                "paymentDate", order.getUpdatedAt().toString().substring(0, 10)
        );
        context.setVariables(variables);
        return context;
    }

    // ── Context builders for dealer emails ──

    private static @NonNull Context getDealerContext(Booking booking, Dealer dealer, User customer, Car car) {
        Context context = new Context();
        Map<String, Object> variables = Map.of(
                "dealerName", dealer.getDealershipName(),
                "customerName", customer.getUserName(),
                "bookingId", booking.getBookingId(),
                "carName", car.getBrand() + " " + car.getModel(),
                "startDate", booking.getStartDate().toString().substring(0, 10),
                "endDate", booking.getEndDate().toString().substring(0, 10),
                "totalAmount", booking.getTotalAmount()
        );
        context.setVariables(variables);
        return context;
    }

    private static @NonNull Context getDealerPaymentContext(
            Booking booking, Dealer dealer, User customer, Car car, Order order) {
        Context context = new Context();
        Map<String, Object> variables = new HashMap<>();
        variables.put("dealerName", dealer.getDealershipName());
        variables.put("customerName", customer.getUserName());
        variables.put("bookingId", booking.getBookingId());
        variables.put("carName", car.getBrand() + " " + car.getModel());
        variables.put("startDate", booking.getStartDate().toString().substring(0, 10));
        variables.put("endDate", booking.getEndDate().toString().substring(0, 10));
        variables.put("totalAmount", booking.getTotalAmount());
        variables.put("paymentStatus", order.getStatus());
        variables.put("orderId", order.getOrder_id());
        variables.put("paymentId", order.getPayment_id());
        variables.put("paymentDate", order.getUpdatedAt().toString().substring(0, 10));
        context.setVariables(variables);
        return context;
    }
}
