package com.driveaway.DTO;

public class ResponseDTO {
	private String email;
	private String role;
	private String token;
	private String userId;
	
	public ResponseDTO(String email, String role, String token, String userId){
		this.email = email;
		this.role = role;
		this.token = token;
		this.userId = userId;
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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
