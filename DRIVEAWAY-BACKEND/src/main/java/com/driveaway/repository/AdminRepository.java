package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.driveaway.entity.User;

public interface AdminRepository extends MongoRepository<User, String>{

}
