package com.driveaway.service;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.entity.DealerApplications;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.repository.BookingRepository;
import com.driveaway.repository.CarRepository;
import com.driveaway.repository.DealerApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private UserRepository repo;

	@Autowired
	private DealerApplicationRepository dealerApplicationRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private CarRepository carRepository;

	@Override
	public User getUserByEmail(String email) {
		return repo.findByUserEmail(email);
	}

	@Override
	public String getApplicationStatus(String userId) {
		DealerApplications dealerApplication = dealerApplicationRepository.findDealerApplicationsByUserId(userId);
		if(dealerApplication == null) return "Application Not Found";
		return dealerApplication.getApprovalStatus();
	}




}
