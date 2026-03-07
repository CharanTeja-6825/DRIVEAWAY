package com.driveaway.service.users;

import com.driveaway.entity.users.User;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.users.AdminRepository;
import com.driveaway.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DealerRepository dealerRepository;

	@Cacheable(value = "users", unless = "#result == null || #result.isEmpty()")
	@Override
	public List<User> getAllUsers() {
		return adminRepository.findAll();
	}


}
