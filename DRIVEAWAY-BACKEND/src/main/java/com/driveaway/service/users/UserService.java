package com.driveaway.service.users;

import com.driveaway.dto.ResponseDTO;
import com.driveaway.entity.users.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
	public ResponseDTO userLogin(String email, String password);
	public User registerUser(User user) throws Exception;
	public User getUser(String email);
	public String updateProfileImage(String userId, MultipartFile profileImage) throws Exception;
}
