package com.driveaway.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.Dealer;
import com.driveaway.service.DealerService;

@RestController
@RequestMapping("/dealer")
public class DealerController {
	
	@Autowired
	private DealerService dealerService;
	
	@GetMapping("/")
	public String dealerHome() {
		return "This is dealer root uri";
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> allDealers(){
		List<Dealer> dealers = dealerService.allDealers();
		if(dealers.size() == 0) return ResponseEntity.ok("No Dealers yet.");
		else return ResponseEntity.ok(dealers);
	}
	
	@PostMapping("/add")
	public String addDealer(@RequestBody Dealer dealer) {
		return dealerService.addDealer(dealer);
	}
	
	@DeleteMapping("/delete/{did}")
	public String deleteDealer(@PathVariable String did) {
		return dealerService.deleteDealer(did);
	}
}
