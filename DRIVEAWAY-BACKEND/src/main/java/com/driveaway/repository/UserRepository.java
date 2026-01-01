package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.driveaway.entity.User;
import java.util.List;



@Repository
public interface UserRepository extends MongoRepository<User, String>{
	public User findByUserEmail(String userEmail);
	public User findByUserName(String userName);
}
