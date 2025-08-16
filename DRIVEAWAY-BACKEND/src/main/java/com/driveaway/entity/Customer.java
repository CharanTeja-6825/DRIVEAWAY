package com.driveaway.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Customer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer {
	@Id
	private String customer_id;
	private String customer_name;
	private String customer_phone;
	private int customer_age;
	@Indexed(unique = true)
	private String customer_license_no;
}
