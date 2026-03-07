package com.driveaway.service.security;

import com.driveaway.entity.users.User;

public interface JWTService {
	public String generateToken(User user);
	public String extractEmail(String token);
	public boolean validateToken(String token, User user);
	public String extractRole(String token);
}
