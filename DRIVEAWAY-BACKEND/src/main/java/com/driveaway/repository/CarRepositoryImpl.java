package com.driveaway.repository;

import com.driveaway.entity.Car;
import com.driveaway.enumerations.BookingStatus;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public class CarRepositoryImpl implements CarRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    public CarRepositoryImpl(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void unlockCars(List<String> cars) {
        Query q = Query.query(Criteria.where("carStatus").is(BookingStatus.PENDING.toString()));
        Update u = new Update().set("carStatus", BookingStatus.AVAILABLE.toString());

        mongoTemplate.updateMulti(q, u, Car.class);
    }
}
