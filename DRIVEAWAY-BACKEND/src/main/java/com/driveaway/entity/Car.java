package com.driveaway.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;

@Document(collection = "Car")
@Data
@AllArgsConstructor
public class Car {
	@Id
	private String car_id;
	private String car_company;
	private String car_model;
	@DocumentReference
	private Dealer dealer;
	private Instant created_at;
}
