package com.driveaway.service;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;
import com.driveaway.roles.Roles;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public User userLogin(String email, String password) {
		return userRepository.findByUserEmailAndPassword(email, password);
	}

	@Override
	public User registerUser(User user) {
		user.setCreatedAt(Instant.now());
		user.setRole(Roles.CUSTOMER);
		return userRepository.save(user);
	}
	
}
