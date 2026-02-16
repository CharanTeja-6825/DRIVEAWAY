package com.driveaway.service;

import java.time.Instant;

import com.driveaway.dto.LoginDTO;
import com.driveaway.entity.Dealer;
import com.driveaway.repository.DealerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.driveaway.dto.ResponseDTO;
import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;
import com.driveaway.enumerations.Roles;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	
	@Autowired
	private JWTService jwtService;

	@Autowired
	private DealerRepository dealerRepository;

	@Autowired
	private CloudinaryService cloudinaryService;
	

	@Override
	public ResponseDTO userLogin(String email, String password) {
		User user = userRepository.findByUserEmail(email);
		if(user != null && encoder.matches(password, user.getPassword())) {
			String token = jwtService.generateToken(user);

			String userId = user.getUserId();
			String role = user.getRole().toString();
			if(role.equals("DEALER")){
				Dealer d = dealerRepository.findDealerByUserId(user.getUserId());
				userId = d.getId();
			}


			LoginDTO loginDTO = new LoginDTO(email, user.getRole(), userId);

			return new ResponseDTO(loginDTO, token);
		}
		else return null;
	}

	public User getUser(String email) {
		return userRepository.findByUserEmail(email);
	}

	@Override
	public String updateProfileImage(String userId, MultipartFile profileImage) throws Exception {
		String imageUrl = cloudinaryService.uploadFile(profileImage, userId);
		return "Profile Updated Successfully";
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
