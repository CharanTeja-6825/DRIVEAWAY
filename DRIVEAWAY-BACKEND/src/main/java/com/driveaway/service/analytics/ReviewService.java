package com.driveaway.service.analytics;

import com.driveaway.entity.analytics.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviewsByCar(String carId);
}
