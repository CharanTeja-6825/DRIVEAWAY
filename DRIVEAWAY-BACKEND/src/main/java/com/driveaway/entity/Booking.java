package com.driveaway.entity;

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
	private Dealer dealer;
	@DocumentReference
	private Car car_id;
}
