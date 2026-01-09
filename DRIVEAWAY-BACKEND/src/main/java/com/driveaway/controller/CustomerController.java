package com.driveaway.controller;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.Dealer;
import com.driveaway.service.DealerApplicationService;
import com.driveaway.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
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
	private DealerApplicationService dealerApplicationService;
	
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
	public ResponseEntity<?> addDealer(@RequestBody DealerRequestDTO dealerRequestDTO){
//		System.out.println("USER = " + dealerRequestDTO.getUser());
		String message = dealerApplicationService.submitApplication(dealerRequestDTO);
		return ResponseEntity.status(201).body(message);
	}

}
