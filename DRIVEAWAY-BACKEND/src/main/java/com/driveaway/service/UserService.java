package com.driveaway.service;

import com.driveaway.entity.User;

public interface UserService {
	public String userLogin(String email, String password);
	public User registerUser(User user) throws Exception;
	public User getUser(String email);
}
