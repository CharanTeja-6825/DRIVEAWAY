package com.driveaway.service;

import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.Dealer;

public interface DealerService {
	public Dealer addDealer(DealerRequestDTO dealerRequestDTO);
}
