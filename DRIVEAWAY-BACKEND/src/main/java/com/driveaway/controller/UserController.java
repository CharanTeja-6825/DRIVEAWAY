package com.driveaway.controller;

import org.springdoc.core.properties.SwaggerUiConfigProperties.Csrf;
import org.springframework.beans.factory.annotation.Autowired;
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
	public User login(@RequestBody User user) {
		return service.userLogin(user.getUserEmail(), user.getPassword());
	}
	
	@GetMapping("/csrf-token")
	public CsrfToken getCsrfToken(HttpServletRequest httpServletRequest) {
		return  (CsrfToken) httpServletRequest.getAttribute("_csrf");
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		return service.registerUser(user);
	}
}
