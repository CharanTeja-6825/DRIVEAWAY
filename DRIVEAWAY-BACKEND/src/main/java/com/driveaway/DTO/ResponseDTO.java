package com.driveaway.DTO;

public class ResponseDTO {
	private String email;
	private String role;
	private String token;
	
	public ResponseDTO(String email, String role, String token){
		this.email = email;
		this.role = role;
		this.token = token;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
