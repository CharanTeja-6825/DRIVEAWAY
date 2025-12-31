package com.driveaway.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.driveaway.roles.Roles;

@Document(collection = "Dealer")
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
	private String location;
	private Roles role;
	private Instant created_at;
	
	public String getDealer_id() {
		return dealer_id;
	}
	public void setDealer_id(String dealer_id) {
		this.dealer_id = dealer_id;
	}
	public String getDealer_ship_name() {
		return dealer_ship_name;
	}
	public void setDealer_ship_name(String dealer_ship_name) {
		this.dealer_ship_name = dealer_ship_name;
	}
	public String getDealer_oname() {
		return dealer_oname;
	}
	public void setDealer_oname(String dealer_oname) {
		this.dealer_oname = dealer_oname;
	}
	public boolean isApproval_status() {
		return approval_status;
	}
	public void setApproval_status(boolean approval_status) {
		this.approval_status = approval_status;
	}
	public String getDealer_gst_in() {
		return dealer_gst_in;
	}
	public void setDealer_gst_in(String dealer_gst_in) {
		this.dealer_gst_in = dealer_gst_in;
	}
	public String getDealer_phone() {
		return dealer_phone;
	}
	public void setDealer_phone(String dealer_phone) {
		this.dealer_phone = dealer_phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
		this.role = role;
	}
	public Instant getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Instant created_at) {
		this.created_at = created_at;
	}
}
