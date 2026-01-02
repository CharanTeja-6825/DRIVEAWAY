package com.driveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.DTO.AuthResponse;
import com.driveaway.entity.User;
import com.driveaway.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {
		AuthResponse response = service.userLogin(user.getUserEmail(), user.getPassword());
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) throws Exception {
		return service.registerUser(user);
	}
}
