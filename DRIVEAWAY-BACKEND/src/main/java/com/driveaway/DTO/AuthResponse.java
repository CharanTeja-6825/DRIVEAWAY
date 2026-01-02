package com.driveaway.DTO;


public class AuthResponse {
	private String token;
	private String email;
	private String role;
	
	public AuthResponse(String token, String email, String role) {
		this.token = token;
		this.email = email;
		this.role = role;
	}
}
