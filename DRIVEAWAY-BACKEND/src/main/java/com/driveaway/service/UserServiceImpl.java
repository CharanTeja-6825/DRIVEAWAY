package com.driveaway.service;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.driveaway.DTO.ResponseDTO;
import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;
import com.driveaway.roles.Roles;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	
	@Autowired
	private JWTService jwtService;
	

	@Override
	public ResponseDTO userLogin(String email, String password) {
		User user = userRepository.findByUserEmail(email);
		if(user != null && encoder.matches(password, user.getPassword())) {
			String token = jwtService.generateToken(user);
			return new ResponseDTO(email, user.getRole(), token);
		}
		else return null;
	}

	public User getUser(String email) {
		return userRepository.findByUserEmail(email);
	}

	@Override
	public User registerUser(User user) throws Exception{
		
		User existingUser = userRepository.findByUserEmail(user.getUserEmail());
		if(existingUser != null) throw new Exception("User already exists with given email");
		
		user.setCreatedAt(Instant.now());
		user.setRole(Roles.CUSTOMER.toString());
		user.setPassword(encoder.encode(user.getPassword()));
		
		return userRepository.save(user);
	}
	
}
