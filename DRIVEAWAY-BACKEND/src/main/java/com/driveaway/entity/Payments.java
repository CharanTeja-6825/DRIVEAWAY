package com.driveaway.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payments")
public class Payments {

    @Id
    private String id;

    private String currency;
    private String status;
    private String method;

    private String booking_id;
}
