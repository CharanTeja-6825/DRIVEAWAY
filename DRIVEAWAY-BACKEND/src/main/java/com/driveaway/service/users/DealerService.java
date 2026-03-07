package com.driveaway.service.users;

import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.users.Dealer;

public interface DealerService {
	public Dealer addDealer(DealerRequestDTO dealerRequestDTO);
}
