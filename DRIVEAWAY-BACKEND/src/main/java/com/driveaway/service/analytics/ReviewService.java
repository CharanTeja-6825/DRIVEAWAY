package com.driveaway.service.analytics;

import com.driveaway.dto.ReviewDTO;
import com.driveaway.entity.analytics.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviewsByCar(String carId);
    List<ReviewDTO> getEnrichedReviewsByCar(String carId);
    boolean canUserReviewBooking(String bookingId, String customerId);
    boolean hasBookingBeenReviewed(String bookingId);
}
