package com.driveaway.repository;

import com.driveaway.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.driveaway.entity.Dealer;

import java.util.List;

public interface DealerRepository extends MongoRepository<Dealer, String>{
}
