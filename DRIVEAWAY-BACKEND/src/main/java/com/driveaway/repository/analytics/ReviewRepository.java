package com.driveaway.repository.analytics;


import com.driveaway.dto.ReviewDTO;
import com.driveaway.entity.analytics.Review;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findReviewsByCarId(String carId);
    
    Optional<Review> findByBookingId(String bookingId);
    
    boolean existsByBookingId(String bookingId);

    @Aggregation(pipeline = {
            // Match reviews for specific car
            "{ $match: { carId: ?0 } }",
            
            // Convert customerId to ObjectId for lookup
            "{ $addFields: { customerObjId: { $toObjectId: '$customerId' } } }",
            
            // Lookup customer details
            "{ $lookup: { from: 'users', localField: 'customerObjId', foreignField: '_id', as: 'customer' } }",
            "{ $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } }",
            
            // Sort by createdAt descending (newest first)
            "{ $sort: { createdAt: -1 } }",
            
            // Project the final result
            "{ $project: { " +
                    "_id: 1, " +
                    "bookingId: 1, " +
                    "carId: 1, " +
                    "customerId: 1, " +
                    "customerName: '$customer.userName', " +
                    "customerProfileUrl: '$customer.profileUrl', " +
                    "review: 1, " +
                    "starRating: 1, " +
                    "createdAt: 1, " +
                    "updatedAt: 1 " +
                    "} }"
    })
    List<ReviewDTO> findEnrichedReviewsByCarId(String carId);

    long countByCarId(String carId);
}
