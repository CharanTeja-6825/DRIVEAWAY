package com.driveaway.controller;

import java.util.List;
import com.driveaway.entity.DealerApplications;
import com.driveaway.service.DealerApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.driveaway.entity.User;
import com.driveaway.enumerations.Roles;
import com.driveaway.service.AdminService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	
	@Autowired
	private AdminService adminService;

	@Autowired
	private DealerApplicationService dealerApplicationService;

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

	@PostMapping("/approve/{id}")
	public ResponseEntity<String> approve(@PathVariable String id, @RequestParam boolean approval){
		String message = dealerApplicationService.approveApplication(id, approval);
		return ResponseEntity.ok(message);
	}

	@GetMapping("/applications")
	public ResponseEntity<?> getAllApplications(){
		List<DealerApplications> apps = dealerApplicationService.allApplications();
		if(apps.size() == 0) return ResponseEntity.ok("No Applications");
		return ResponseEntity.ok(apps);
	}
}
