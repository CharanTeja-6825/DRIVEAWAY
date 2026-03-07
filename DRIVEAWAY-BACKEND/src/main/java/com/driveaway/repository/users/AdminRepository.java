package com.driveaway.repository.users;

import com.driveaway.entity.users.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<User, String>{

}
