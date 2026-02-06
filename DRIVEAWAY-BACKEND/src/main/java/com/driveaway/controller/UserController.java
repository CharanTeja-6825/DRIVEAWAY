package com.driveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.driveaway.dto.ResponseDTO;
import com.driveaway.entity.User;
import com.driveaway.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService service;

	@GetMapping("/awake")
	public String keepEngineAwake(){
		return "Jai Balayya !!!";
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		ResponseDTO response = service.userLogin(user.getUserEmail(), user.getPassword());
		
		if(response == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials or User not found");
		
		else return ResponseEntity.ok(response);
		
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) throws Exception {
		return service.registerUser(user);
	}
}
