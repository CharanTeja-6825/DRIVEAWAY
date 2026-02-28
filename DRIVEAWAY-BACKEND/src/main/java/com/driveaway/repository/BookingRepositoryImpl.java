package com.driveaway.repository;

import com.driveaway.entity.Booking;
import com.driveaway.entity.Car;
import com.driveaway.enumerations.BookingStatus;
import com.mongodb.client.MongoClient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public class BookingRepositoryImpl implements BookingRepositoryCustom{

    private final MongoTemplate mongoTemplate;
    private final MongoClient mongo;

    public BookingRepositoryImpl(MongoTemplate mongoTemplate, MongoClient mongo){
        this.mongoTemplate=mongoTemplate;
        this.mongo = mongo;
    }

    @Override
    public void expirePendingBookings(Instant cutoff) {
        Query query = Query.query(Criteria.where("status")
                                          .is(BookingStatus.PENDING.toString())
                .and("createdAt").lt(cutoff));

        Update update = new Update().set("status", BookingStatus.EXPIRED.toString());

        mongoTemplate.updateMulti(query, update, Booking.class);
    }

    @Override
    public void activateBooking(Instant currentDate, List<String> cars) {

        Query bookingQuery = Query.query(Criteria.where("status").is(BookingStatus.PAID.toString())
                .and("startDate")
                .lte(currentDate));

        Update bookingUpdate = new Update().set("status", BookingStatus.ACTIVE.toString());

        Query carQuery = Query.query(Criteria.where("_id").in(cars)
                .and("carStatus")
                .is(BookingStatus.BOOKED.toString()));

        Update carUpdate = new Update().set("carStatus", BookingStatus.ACTIVE.toString());

        mongoTemplate.updateMulti(bookingQuery, bookingUpdate, Booking.class);
        mongoTemplate.updateMulti(carQuery, carUpdate, Car.class);

    }

    @Override
    public void completeBooking(Instant currentDate, List<String> cars) {
        Query bookingQuery = Query.query(Criteria.where("status").is(BookingStatus.ACTIVE.toString())
                .and("endDate")
                .lte(currentDate));

        Update bookingUpdate = new Update().set("status", BookingStatus.COMPLETED.toString());

        Query carQuery = Query.query(Criteria.where("_id").in(cars)
                .and("carStatus")
                .in(BookingStatus.ACTIVE.toString(), BookingStatus.BOOKED.toString()));

        Update carUpdate = new Update().set("carStatus", BookingStatus.AVAILABLE.toString());

        mongoTemplate.updateMulti(bookingQuery, bookingUpdate, Booking.class);
        mongoTemplate.updateMulti(carQuery, carUpdate, Car.class);
    }
}
