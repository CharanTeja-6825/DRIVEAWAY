package com.driveaway.service.analytics;

import com.driveaway.entity.analytics.Review;
import com.driveaway.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getReviewsByCar(String carId) {
        return reviewRepository.findReviewsByCarId(carId);
    }
}
