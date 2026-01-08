package com.driveaway.service;

import com.driveaway.entity.User;

public interface CustomerService {
	
	public User getUserByEmail(String email);
	public String dealerApproval(String email);

}
