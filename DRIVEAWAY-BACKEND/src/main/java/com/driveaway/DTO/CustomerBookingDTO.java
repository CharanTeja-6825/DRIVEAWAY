package com.driveaway.DTO;

import com.driveaway.entity.Dealer;
import com.driveaway.entity.User;

import java.time.Instant;

public class CustomerBookingDTO extends BookingDTO{
    private Dealer dealer;

    public CustomerBookingDTO(String bookingId, String carId, String dealerId, String customerId, User user, Instant startDate, Instant endDate, double totalAmount, String status, Instant createdAt, Instant approvedAt, Dealer dealer) {
        super(bookingId, carId, dealerId, customerId, user, startDate, endDate, totalAmount, status, createdAt, approvedAt);
        this.dealer = dealer;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }
}
