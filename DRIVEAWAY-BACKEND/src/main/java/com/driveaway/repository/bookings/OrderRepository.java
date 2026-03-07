package com.driveaway.repository.bookings;

import com.driveaway.entity.bookings.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {

}
