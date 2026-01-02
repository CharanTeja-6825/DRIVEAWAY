package com.driveaway.service;

import com.driveaway.DTO.AuthResponse;
import com.driveaway.entity.User;

public interface UserService {
	public AuthResponse userLogin(String email, String password) throws Exception;
	public User registerUser(User user) throws Exception;
	public User getUser(String email);
}
