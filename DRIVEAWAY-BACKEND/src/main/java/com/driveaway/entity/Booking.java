package com.driveaway.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;


@Document(collection = "Booking")
@Data
@AllArgsConstructor
public class Booking {
	@Id
	private String booking_id;
	@DocumentReference
	private Customer customer;
	@DocumentReference
	private Car car;
	private Instant booked_at;
	private boolean booking_status;
}
