package com.driveaway.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Dealer;
import com.driveaway.repository.DealerRepository;

@Service
public class DealerServiceImpl implements DealerService{

	@Autowired
	private DealerRepository repo;
	
	@Override
	public String addDealer(Dealer dealer) {
		dealer.setDealer_id(UUID.randomUUID().toString().split("-")[0]);
		repo.save(dealer);
		return dealer.toString()+"\n added successfully !";
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
	
}
