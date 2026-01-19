package com.driveaway.repository;

import com.driveaway.entity.Booking;
import com.driveaway.enumerations.BookingStatus;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public class BookingRepositoryImpl implements BookingRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    public BookingRepositoryImpl(MongoTemplate mongoTemplate){
        this.mongoTemplate=mongoTemplate;
    }

    @Override
    public void expirePendingBookings(Instant cutoff) {
        Query query = Query.query(Criteria.where("status")
                                          .is(BookingStatus.PENDING.toString())
                .and("createdAt").lt(cutoff));

        Update update = new Update().set("status", BookingStatus.EXPIRED.toString());

        mongoTemplate.updateMulti(query, update, Booking.class);
    }
}
