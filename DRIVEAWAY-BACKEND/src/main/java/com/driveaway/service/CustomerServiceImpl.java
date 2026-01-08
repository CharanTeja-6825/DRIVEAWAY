package com.driveaway.service;

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


}
