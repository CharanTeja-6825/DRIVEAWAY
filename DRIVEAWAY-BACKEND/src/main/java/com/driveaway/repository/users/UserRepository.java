package com.driveaway.repository.users;

import com.driveaway.entity.users.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<User, String>{
	public User findByUserEmail(String userEmail);
	public User findByUserName(String userName);
}
