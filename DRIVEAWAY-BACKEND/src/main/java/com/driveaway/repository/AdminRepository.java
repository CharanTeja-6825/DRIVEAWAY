package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.driveaway.entity.Admin;

public interface AdminRepository extends MongoRepository<Admin, String>{

}
