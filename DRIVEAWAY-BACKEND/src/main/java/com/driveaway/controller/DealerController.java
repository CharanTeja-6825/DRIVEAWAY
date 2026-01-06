package com.driveaway.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dealer")
@CrossOrigin("*")
@PreAuthorize("hasRole('DEALER')")
public class DealerController {
	
	@GetMapping("/")
	public String dealerHome() {
		return "Dealer Home";
	}
	
}
