package com.driveaway.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.Customer;
import com.driveaway.service.CustomerService;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/")
	public String customerHome() {
		return "This is customer home uri";
	}
	
	@PostMapping("/add")
	public String addCustomer(@RequestBody Customer customer) {
		try {
			return customerService.addCustomer(customer);
		} catch (Exception e) {
			return "License already exists in DB";
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> allCustomers() {
		List<Customer> customers = customerService.allCustomers();
		if(customers.size() == 0) return ResponseEntity.ok("customer list is empty");
		else return ResponseEntity.ok(customers);
	}
	
	@DeleteMapping("/delete/{cid}")
	public String deleteCustomer(@PathVariable String cid) {
		return customerService.deleteCustomer(cid);
	}
}
