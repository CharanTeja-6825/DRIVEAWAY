package com.driveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.User;
import com.driveaway.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/")
	public String chome() {
		return "Hello Customer";
	}

	@GetMapping("/{email}")
	public ResponseEntity<?> getUser(@PathVariable String email){
		User user = customerService.getUserByEmail(email);
		if(user == null) {
			return ResponseEntity.status(404).body("User not found");
		}
		return ResponseEntity.ok(user);
	}
}
