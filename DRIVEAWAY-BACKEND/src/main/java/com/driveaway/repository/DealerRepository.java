package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.driveaway.entity.User;

public interface DealerRepository extends MongoRepository<User, String>{
	
}
