package com.driveaway.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Document(collection = "Admin")
@Data
@AllArgsConstructor
public class Admin {
	@Id
	private String username;
	private String password;
	private Instant created_at;
}
