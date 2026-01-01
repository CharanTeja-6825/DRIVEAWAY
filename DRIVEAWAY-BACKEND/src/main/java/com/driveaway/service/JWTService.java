package com.driveaway.service;

import com.driveaway.entity.User;

public interface JWTService {
	public String generateToken(String subject);
	public String extractEmail(String token);
	public boolean validateToken(String token, User user);
}
