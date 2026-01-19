package com.driveaway.repository;

import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface BookingRepositoryCustom {
    public void expirePendingBookings(Instant cutoff);
}
