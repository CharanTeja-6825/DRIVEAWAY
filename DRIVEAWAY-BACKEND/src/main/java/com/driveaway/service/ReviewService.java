package com.driveaway.service;

import com.driveaway.entity.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviewsByCar(String carId);
}
