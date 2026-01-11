package com.driveaway.repository;

import com.driveaway.entity.DealerApplications;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DealerApplicationRepository extends MongoRepository<DealerApplications, String> {
    DealerApplications findDealerApplicationsByUserId(String userId);
}
