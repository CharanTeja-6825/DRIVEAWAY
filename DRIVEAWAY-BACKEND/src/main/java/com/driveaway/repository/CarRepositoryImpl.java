package com.driveaway.repository;

import com.driveaway.entity.Car;
import com.driveaway.enumerations.BookingStatus;
import com.mongodb.client.result.UpdateResult;
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
        Query q = Query.query(Criteria.where("_id").in(cars).and("carStatus").in(
                BookingStatus.PENDING.toString(),
                BookingStatus.CANCELLED.toString(),
                BookingStatus.COMPLETED.toString(),
                BookingStatus.EXPIRED_COOLING.toString(),
                BookingStatus.REJECTED.toString()
        ));
        Update u = new Update().set("carStatus", BookingStatus.AVAILABLE.toString());

        mongoTemplate.updateMulti(q, u, Car.class);
    }

    public String updateCar(Car car) {
        Query q = Query.query(Criteria.where("_id").is(car.getCarId()));

        Update u = new Update()
                .set("brand", car.getBrand())
                .set("model", car.getModel())
                .set("year", car.getYear())
                .set("pricePerDay", car.getPricePerDay());

        UpdateResult result =
                mongoTemplate.updateFirst(q, u, Car.class);

        if (result.getMatchedCount() == 0)
            return "Car Not Found";

        return "Car Data Updated";
    }

}
