package com.driveaway.controller;

import com.driveaway.entity.Dealer;
import com.driveaway.service.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dealer")
@CrossOrigin("*")
@PreAuthorize("hasRole('DEALER')")
public class DealerController {

	@Autowired
	private DealerService dealerService;

	@GetMapping("/")
	public String dealerHome() {
		return "Dealer Home";
	}
	
}
