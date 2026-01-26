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
	public ResponseEntity<?> login(@RequestBody User user,
								   HttpServletResponse response) {

		ResponseDTO auth = service.userLogin(
				user.getUserEmail(),
				user.getPassword()
		);

		if (auth == null) {
			return ResponseEntity
					.status(HttpStatus.UNAUTHORIZED)
					.body("Invalid credentials");
		}

		ResponseCookie cookie = ResponseCookie.from("JWT_TOKEN", auth.token())
				.httpOnly(true)
				.secure(false)              // true in production (HTTPS)
				.sameSite("Lax")            // ✔ SAFE for local dev
				.path("/")
				.maxAge(Duration.ofHours(1))
				.build();

		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

		return ResponseEntity.ok(auth);
	}


	@PostMapping("/register")
	public User register(@RequestBody User user) throws Exception {
		return service.registerUser(user);
	}
}
