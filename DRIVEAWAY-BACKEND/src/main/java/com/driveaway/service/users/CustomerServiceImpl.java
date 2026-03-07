package com.driveaway.service.users;

import com.driveaway.entity.analytics.DealerApplications;
import com.driveaway.entity.users.User;
import com.driveaway.repository.DealerApplicationRepository;
import com.driveaway.repository.bookings.BookingRepository;
import com.driveaway.repository.bookings.CarRepository;
import com.driveaway.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
	
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
