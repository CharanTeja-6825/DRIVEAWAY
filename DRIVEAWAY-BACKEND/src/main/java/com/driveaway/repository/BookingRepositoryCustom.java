package com.driveaway.repository;

import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface BookingRepositoryCustom {
    void expirePendingBookings(Instant cutoff);
    void activateBooking(Instant startDate);
    void completeBooking(Instant endDate);
}
