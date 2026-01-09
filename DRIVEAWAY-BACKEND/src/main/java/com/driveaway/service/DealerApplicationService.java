package com.driveaway.service;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.DealerApplications;

public interface DealerApplicationService {
    public String submitApplication(DealerRequestDTO dealerRequestDTO);
    public String approveApplication(String applicationId);
}
