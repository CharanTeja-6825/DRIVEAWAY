package com.driveaway.repository;

import com.driveaway.dto.CustomerBookingDTO;
import com.driveaway.entity.Booking;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String>, BookingRepositoryCustom {
    List<Booking> findBookingsByDealerId(String dealerId);

    @Aggregation(pipeline = {

            // 1️⃣ Match customer
            "{ $match: { customerId: ?0 } }",

            // 2️⃣ Convert IDs + expose bookingId
            "{ $addFields: { " +
                    "dealerObjId: { $toObjectId: '$dealerId' }, " +
                    "carObjId: { $toObjectId: '$carId' }, " +
                    "} }",

            // 3️⃣ Lookup dealer (DO NOT DROP if missing)
            "{ $lookup: { from: 'dealers', localField: 'dealerObjId', foreignField: '_id', as: 'dealer' } }",
            "{ $unwind: { path: '$dealer', preserveNullAndEmptyArrays: true } }",

            // 4️⃣ Lookup car (DO NOT DROP if missing)
            "{ $lookup: { from: 'cars', localField: 'carObjId', foreignField: '_id', as: 'car' } }",
            "{ $unwind: { path: '$car', preserveNullAndEmptyArrays: true } }",

            // 5️⃣ Projection
            "{ $project: { " +
                    "_id: 1," +
                    "startDate: 1," +
                    "endDate: 1," +
                    "totalAmount: 1," +
                    "status: 1," +
                    "createdAt: 1," +

                    "dealershipName: '$dealer.dealershipName'," +
                    "dealerLocation: '$dealer.location'," +
                    "dealerPhone: '$dealer.phone'," +

                    "carBrand: '$car.brand'," +
                    "carModel: '$car.model'," +
                    "carYear: '$car.year'" +
                    "} }"
    })
    List<CustomerBookingDTO> findCustomerBookings(String customerId);

    List<Booking> findBookingsByCreatedAtLessThan(Instant createdAtIsLessThan);

    List<Booking> findBookingsByStatusAndStartDateLessThanEqual(String status, Instant startDateIsLessThan);

    List<Booking> findBookingsByStatusAndEndDateLessThanEqual(String status, Instant endDateIsLessThan);
}
