package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.driveaway.entity.Dealer;

public interface DealerRepository extends MongoRepository<Dealer, String>{
	
}
