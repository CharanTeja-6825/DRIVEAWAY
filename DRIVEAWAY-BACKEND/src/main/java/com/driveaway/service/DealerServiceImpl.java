package com.driveaway.service;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.User;
import com.driveaway.enumerations.Roles;
import com.driveaway.repository.DealerRepository;
import com.driveaway.enumerations.Approval;
import com.driveaway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Dealer;

import java.time.Instant;
import java.util.Optional;

@Service
public class DealerServiceImpl implements DealerService{

	@Autowired
	private DealerRepository dealerRepository;
    @Autowired
    private UserRepository userRepository;

	@Override
	public Dealer addDealer(DealerRequestDTO dto) {
		System.out.println("USER = " + dto.getUser());

		Optional<User> u = userRepository.findById(dto.getUser());
		if(u.isEmpty()) return null;

		// Creating Dealer object for adding Dealer.
		Dealer d = new Dealer();
		d.setUser(dto.getUser());
		d.setLocation(dto.getLocation());
		d.setDealershipName(dto.getDealershipName());
		d.setOwnerName(dto.getOwnerName());
		d.setGstIn(dto.getGstIn());
		d.setCreatedAt(Instant.now());
		d.setApprovalStatus(Approval.PENDING.toString());
		return dealerRepository.save(d);
	}

}
