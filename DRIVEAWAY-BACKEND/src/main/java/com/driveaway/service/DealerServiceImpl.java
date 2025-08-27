package com.driveaway.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.management.relation.RoleNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Dealer;
import com.driveaway.repository.BookingRepository;
import com.driveaway.repository.DealerRepository;
import com.driveaway.roles.Roles;

@Service
public class DealerServiceImpl implements DealerService{

	@Autowired
	private DealerRepository repo;
	
	@Autowired
	private BookingRepository brepo;
	
	@Override
	public String addDealer(Dealer dealer) {
		try {
			dealer.setDealer_id(UUID.randomUUID().toString().split("-")[0]);
			if(!dealer.getRole().equals(Roles.DEALER)) {
				return "Role is not set Properly";
			}else {
				repo.save(dealer);
				return dealer.toString()+"\n added successfully !";
			}
		} catch (Exception e) {
			return "GST IN already exists";
		}
	}

	@Override
	public String approveDealer(String dealerid) {
		Optional<Dealer> dobj = repo.findById(dealerid);
		if(dobj.isPresent()) {
			Dealer obj = dobj.get();
			obj.setApproval_status(true);
			return "Dealer Approved";
		}else {
			return "Dealer not found";
		}
	}

	@Override
	public List<Dealer> allDealers() {
		return repo.findAll();
	}

	@Override
	public String deleteDealer(String dealerid) {
		Optional<Dealer> dealopt = repo.findById(dealerid);
		if(dealopt.isPresent()) {
			Dealer dealer = dealopt.get();
			repo.delete(dealer);
			return dealer.getDealer_oname()+" is deleted !";
		}else {
			return "Dealer not found !";
		}
	}

	@Override
	public String approveBooking(String bookingid) {
		Optional<Booking> boj = brepo.findById(bookingid);
		if(boj.isPresent()) {
			Booking obj = boj.get();
			obj.setBooking_status(true);
			brepo.save(obj);
			return "Booking Approved Success !";
		}else {
			return "Booking ID not found";
		}
	}
	
}
