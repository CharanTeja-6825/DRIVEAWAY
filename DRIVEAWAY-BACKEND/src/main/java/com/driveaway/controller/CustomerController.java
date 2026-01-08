package com.driveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

	@PostMapping("/request")
	public ResponseEntity<String> dealerRequest(@RequestParam String email){
		String message = customerService.dealerApproval(email);
		if(message.equals("User not found")) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		return ResponseEntity.ok(message);
	}
}
