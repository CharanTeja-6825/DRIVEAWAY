package com.driveaway.service;

import java.util.List;

import com.driveaway.entity.Dealer;

public interface DealerService {
	public String addDealer(Dealer dealer);
	public String approveDealer(String dealerid);
	public List<Dealer> allDealers();
	public String deleteDealer(String dealerid);
	public String approveBooking(String bookingid);
}
