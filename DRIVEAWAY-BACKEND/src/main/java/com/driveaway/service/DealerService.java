package com.driveaway.service;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.Car;
import com.driveaway.entity.Dealer;

import java.util.List;

public interface DealerService {
	public Dealer addDealer(DealerRequestDTO dealerRequestDTO);
}
