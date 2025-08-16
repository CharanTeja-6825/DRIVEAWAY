package com.driveaway.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.driveaway.entity.Customer;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String>{

}
