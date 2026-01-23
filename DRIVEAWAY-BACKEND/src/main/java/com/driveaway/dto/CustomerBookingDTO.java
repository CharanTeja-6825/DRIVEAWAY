package com.driveaway.dto;

import java.time.Instant;

public record CustomerBookingDTO(
    String _id,
    Instant startDate,
    Instant endDate,
    Double totalAmount,
    String status,

    String dealershipName,
    String dealerLocation,
    String dealerPhone,

    String carBrand,
    String carModel,
    Integer carYear
) {}
