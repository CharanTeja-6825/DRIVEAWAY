package com.driveaway.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "test_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Test {
	@Id
	private String testId;
	private String name;
	private String phone;
	private int age;
}
