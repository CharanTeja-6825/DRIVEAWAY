package com.driveaway.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.driveaway.roles.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Dealer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dealer {
	@Id
	private String dealer_id;
	private String dealer_ship_name;
	private String dealer_oname;
	private boolean approval_status;
	@Indexed(unique = true)
	private String dealer_gst_in;
	private String dealer_phone;
	private String password;
	private Roles role;
}
