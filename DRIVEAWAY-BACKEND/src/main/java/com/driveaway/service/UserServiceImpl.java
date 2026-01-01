package com.driveaway.service;

import java.time.Instant;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;
import com.driveaway.roles.Roles;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	
	@Override
	public User userLogin(String email, String password) {
		User user = userRepository.findByUserEmail(email);
		if(user != null && encoder.matches(password, user.getPassword())) return user;
		return null;
	}

	@Override
	public User registerUser(User user) {
		user.setCreatedAt(Instant.now());
		user.setRole(Roles.CUSTOMER);
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
}
