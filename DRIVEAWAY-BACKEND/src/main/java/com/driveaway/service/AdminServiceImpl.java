package com.driveaway.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Admin;
import com.driveaway.entity.Dealer;
import com.driveaway.repository.DealerRepository;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private DealerRepository repo;
	
	@Override
	public String approveDealer(String dealerid) {
		Optional<Dealer> dealobj = repo.findById(dealerid);
		if(dealobj.isPresent()) {
			Dealer dobj = dealobj.get();
			dobj.setApproval_status(true);
			repo.save(dobj);
			return "Dealer Approved";
		}else {
			return "Dealer Not found";
		}
	}
	
}
