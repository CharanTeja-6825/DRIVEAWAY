package com.driveaway.service.users;

import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.users.Dealer;
import com.driveaway.entity.users.User;
import com.driveaway.enumerations.Approval;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.bookings.CarRepository;
import com.driveaway.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class DealerServiceImpl implements DealerService {

	@Autowired
	private DealerRepository dealerRepository;
    @Autowired
    private UserRepository userRepository;
	@Autowired
	private CarRepository carRepository;

	@Override
	public Dealer addDealer(DealerRequestDTO dto) {
		System.out.println("USER = " + dto.user());

		Optional<User> u = userRepository.findById(dto.user());
		if(u.isEmpty()) return null;

		// Creating Dealer object for adding Dealer.
		Dealer d = new Dealer();
		d.setUser(dto.user());
		d.setLocation(dto.location());
		d.setDealershipName(dto.dealershipName());
		d.setOwnerName(dto.ownerName());
		d.setGstIn(dto.gstIn());
		d.setCreatedAt(Instant.now());
		d.setApprovalStatus(Approval.PENDING.toString());
		return dealerRepository.save(d);
	}



}
