package com.driveaway.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookings")
@CompoundIndex(
        name = "unique_active_booking_per_car",
        def = "{'carId': 1, 'status': 1}"
)
public class Booking {

    @Id
    private String id;

    @Indexed
    private String carId;

    @Indexed
    private String dealerId;

    @Indexed
    private String customerId;

    private Instant startDate;
    private Instant endDate;

    private double pricePerDay;
    private double totalAmount;

    @Indexed
    private BookingStatus status;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant approvedAt;

    private boolean autoAccepted;


}
