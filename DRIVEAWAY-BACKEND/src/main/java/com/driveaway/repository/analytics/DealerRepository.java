package com.driveaway.repository;

import com.driveaway.entity.users.Dealer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DealerRepository extends MongoRepository<Dealer, String>{
    Dealer findDealerByUserId(String userId);
}
