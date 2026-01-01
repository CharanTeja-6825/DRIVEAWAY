package com.driveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.User;
import com.driveaway.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private UserService service;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		String message = service.userLogin(user.getUserEmail(), user.getPassword());
		
		switch(message) {
		case "SUCCESS":
			User u = service.getUser(user.getUserEmail());
			return ResponseEntity.ok(u);
		case "INVALID":
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
		case "NOT_FOUND":
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		default:
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Network Error");
		}
		
	}
	
	@GetMapping("/csrf-token")
	public CsrfToken getCsrfToken(HttpServletRequest httpServletRequest) {
		return  (CsrfToken) httpServletRequest.getAttribute("_csrf");
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) throws Exception {
		return service.registerUser(user);
	}
}
