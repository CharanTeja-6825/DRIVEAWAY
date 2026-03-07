package com.driveaway.service.analytics;

import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.analytics.DealerApplications;

import java.util.List;

public interface DealerApplicationService {
    public String submitApplication(DealerRequestDTO dealerRequestDTO);
    public String approveApplication(String applicationId, boolean reject);
    public List<DealerApplications> allApplications();
}
