package com.driveaway.service.analytics;

import com.driveaway.dto.ReviewDTO;
import com.driveaway.entity.analytics.Review;
import com.driveaway.entity.bookings.Booking;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.analytics.ReviewRepository;
import com.driveaway.repository.bookings.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<Review> getReviewsByCar(String carId) {
        return reviewRepository.findReviewsByCarId(carId);
    }

    @Override
    public List<ReviewDTO> getEnrichedReviewsByCar(String carId) {
        return reviewRepository.findEnrichedReviewsByCarId(carId);
    }

    @Override
    public boolean canUserReviewBooking(String bookingId, String customerId) {
        // Check if booking exists and belongs to the customer
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isEmpty()) {
            return false;
        }
        
        Booking booking = optionalBooking.get();
        
        // Verify the booking belongs to the customer
        if (!booking.getCustomerId().equals(customerId)) {
            return false;
        }
        
        // Check if booking status is COMPLETED
        if (!BookingStatus.COMPLETED.toString().equals(booking.getStatus())) {
            return false;
        }
        
        // Check if a review already exists for this booking
        return !reviewRepository.existsByBookingId(bookingId);
    }

    @Override
    public boolean hasBookingBeenReviewed(String bookingId) {
        return reviewRepository.existsByBookingId(bookingId);
    }
}
