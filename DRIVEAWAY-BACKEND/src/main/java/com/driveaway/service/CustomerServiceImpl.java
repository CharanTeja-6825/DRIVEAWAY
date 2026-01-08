package com.driveaway.service;

import com.driveaway.roles.Approval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private UserRepository repo;

	@Override
	public User getUserByEmail(String email) {
		return repo.findByUserEmail(email);
	}

	@Override
	public String dealerApproval(String email) {
		User u = repo.findByUserEmail(email);
		if(u == null) return "User not found";
		u.setApprovalStatus(Approval.PENDING.toString());
		repo.save(u);
		return "Requested Sent";
	}

}
