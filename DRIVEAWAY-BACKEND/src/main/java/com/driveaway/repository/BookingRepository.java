package com.driveaway.repository;

import com.driveaway.entity.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findBookingsByDealerId(String dealerId);
}
