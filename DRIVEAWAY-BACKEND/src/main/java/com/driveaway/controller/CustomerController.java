package com.driveaway.controller;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.Dealer;
import com.driveaway.service.DealerService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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

	@Autowired
	private DealerService dealerService;
	
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

	@PostMapping("/add")
	public ResponseEntity<?> addDealer(@RequestBody DealerRequestDTO dealer){
		System.out.println("USER = " + dealer.getUser());
		Dealer d = dealerService.addDealer(dealer);
		if(d == null) return ResponseEntity.status(404).body("User not found");
		return ResponseEntity.status(201).body(d);
	}

}
