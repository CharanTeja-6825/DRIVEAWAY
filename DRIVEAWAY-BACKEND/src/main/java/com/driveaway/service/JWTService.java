package com.driveaway.service;

import com.driveaway.entity.User;

public interface JWTService {
	public String generateToken(User user);
	public String extractEmail(String token);
	public boolean validateToken(String token, User user);
	public String extractRole(String token);
}
