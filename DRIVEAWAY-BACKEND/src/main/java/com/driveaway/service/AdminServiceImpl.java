package com.driveaway.service;

import java.util.List;

import com.driveaway.entity.Dealer;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.UserRepository;
import com.driveaway.roles.Approval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.User;
import com.driveaway.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DealerRepository dealerRepository;
	
	@Override
	public List<User> getAllUsers() {
		return adminRepository.findAll();
	}


}
