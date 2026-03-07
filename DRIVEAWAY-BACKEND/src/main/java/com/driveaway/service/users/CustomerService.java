package com.driveaway.service.users;

import com.driveaway.entity.users.User;

public interface CustomerService {
	
	public User getUserByEmail(String email);
	public String getApplicationStatus(String userId);
}
