package com.driveaway.repository.bookings;

import com.driveaway.entity.bookings.Booking;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface BookingRepositoryCustom {
    void expirePendingBookings(Instant cutoff);
    List<Booking> activateBooking(Instant startDate, List<String> cars);
    List<Booking> completeBooking(Instant endDate, List<String> cars);
}
