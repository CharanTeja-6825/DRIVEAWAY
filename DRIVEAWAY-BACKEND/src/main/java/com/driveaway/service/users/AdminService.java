package com.driveaway.service.users;

import com.driveaway.dto.AdminAnalyticsDTO;
import com.driveaway.entity.users.User;

import java.util.List;

public interface AdminService {
	public List<User> getAllUsers();
	public AdminAnalyticsDTO getAnalytics();
}
