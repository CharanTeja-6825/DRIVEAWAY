package com.driveaway.controller;

import com.driveaway.dto.ResponseDTO;
import com.driveaway.entity.User;
import com.driveaway.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService service;

	@GetMapping("/awake")
	public String keepEngineAwake(){
		return "Jai Balayya !!!";
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse httpServletResponse) {
		ResponseDTO response = service.userLogin(user.getUserEmail(), user.getPassword());
		
		if(response == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials or User not found");

		ResponseCookie responseCookie = ResponseCookie.from("token", response.token())
				.httpOnly(true)
				.secure(true)
				.sameSite("Lax")
				.maxAge(7 * 24 * 60 * 60)
				.path("/")
				.domain("localhost")
				.build();

		httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

		return ResponseEntity.ok(response.loginDTO());
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) throws Exception {
		return service.registerUser(user);
	}
}
