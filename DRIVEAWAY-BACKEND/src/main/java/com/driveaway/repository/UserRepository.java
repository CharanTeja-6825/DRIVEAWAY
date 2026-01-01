package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.driveaway.entity.User;


@Repository
public interface UserRepository extends MongoRepository<User, String>{
	public User findByUserEmailAndPassword(String userEmail, String password);
}
