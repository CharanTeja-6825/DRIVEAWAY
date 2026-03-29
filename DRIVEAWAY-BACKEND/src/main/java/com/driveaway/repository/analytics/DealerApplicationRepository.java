package com.driveaway.repository.analytics;

import com.driveaway.entity.analytics.DealerApplications;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DealerApplicationRepository extends MongoRepository<DealerApplications, String> {
    DealerApplications findDealerApplicationsByUserId(String userId);
    long countByApprovalStatus(String approvalStatus);
}
