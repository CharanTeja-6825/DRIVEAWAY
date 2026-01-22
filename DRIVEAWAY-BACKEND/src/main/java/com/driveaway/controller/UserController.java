package com.driveaway.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.Cookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.dto.ResponseDTO;
import com.driveaway.entity.User;
import com.driveaway.service.UserService;

import java.time.Duration;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService service;
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse httpServletResponse) {
		ResponseDTO response = service.userLogin(user.getUserEmail(), user.getPassword());

		System.out.println(response.token());

		ResponseCookie cookie = ResponseCookie.from("JWT_TOKEN", response.token())
				.httpOnly(true)
				.secure(false)
				.path("/")
				.maxAge(Duration.ofHours(1L))
				.sameSite(Cookie.SameSite.NONE.toString())
				.build();

		httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

		if(response == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials or User not found");
		
		else return ResponseEntity.ok(response);
		
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) throws Exception {
		return service.registerUser(user);
	}
}
