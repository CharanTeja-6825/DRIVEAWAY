package com.driveaway.controller;

import java.util.List;

import com.driveaway.entity.Dealer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.driveaway.entity.User;
import com.driveaway.roles.Roles;
import com.driveaway.service.AdminService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/")
	public String test(HttpServletRequest request) {
		return "Jai Balayya : "+request.getSession().getId();
	}
	
	@GetMapping("/all")
	public List<User> getAllUsers(){
		List<User> users = adminService.getAllUsers();
		users = users.stream()
							  .filter(user -> user.getRole() != Roles.ADMIN.toString())
							  .toList();
		return users;
	}
}
