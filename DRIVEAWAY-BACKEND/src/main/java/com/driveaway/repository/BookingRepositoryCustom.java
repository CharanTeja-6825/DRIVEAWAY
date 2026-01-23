package com.driveaway.repository;

import com.driveaway.entity.Car;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BookingRepositoryCustom {
    void expirePendingBookings(Instant cutoff);
    void activateBooking(Instant startDate, List<String> cars);
    void completeBooking(Instant endDate, List<String> cars);
}
