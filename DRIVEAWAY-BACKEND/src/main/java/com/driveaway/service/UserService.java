package com.driveaway.service;

import com.driveaway.entity.User;

public interface UserService {
	public User userLogin(String email, String password);
	public User registerUser(User user);
}
