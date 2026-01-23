package com.driveaway.dto;

import com.driveaway.entity.User;

import java.time.Instant;

public record BookingDTO(String bookingId, String carId, String dealerId, String customerId, User user, Instant startDate, Instant endDate, double totalAmount, String status, Instant createdAt, Instant approvedAt)
{

}
