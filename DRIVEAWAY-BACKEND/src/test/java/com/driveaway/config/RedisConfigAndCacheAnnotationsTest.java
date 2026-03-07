package com.driveaway.config;

import com.driveaway.entity.bookings.Car;
import com.driveaway.service.bookings.CarServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import java.lang.reflect.Method;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RedisConfigAndCacheAnnotationsTest {

    @Test
    void redisObjectMapperShouldSerializeAndDeserializeInstantAsIsoString() throws Exception {
        RedisConfig redisConfig = new RedisConfig();
        ObjectMapper mapper = redisConfig.redisObjectMapper();
        Instant now = Instant.parse("2026-02-28T05:00:00Z");

        InstantHolder holder = new InstantHolder();
        holder.setCreatedAt(now);

        String json = mapper.writeValueAsString(holder);
        InstantHolder roundTrip = mapper.readValue(json, InstantHolder.class);

        assertTrue(json.contains("2026-02-28T05:00:00Z"));
        assertEquals(now, roundTrip.getCreatedAt());
    }

    @Test
    void carServiceCachingAnnotationsShouldBePresent() throws Exception {
        Method allCars = CarServiceImpl.class.getMethod("allCars");
        Method addCar = CarServiceImpl.class.getMethod("addCar", Car.class);
        Method updateCar = CarServiceImpl.class.getMethod("updateCar", Car.class);
        Method deleteCar = CarServiceImpl.class.getMethod("deleteCar", String.class);

        assertTrue(allCars.isAnnotationPresent(Cacheable.class));
        assertTrue(addCar.isAnnotationPresent(CacheEvict.class));
        assertTrue(updateCar.isAnnotationPresent(CacheEvict.class));
        assertTrue(deleteCar.isAnnotationPresent(CacheEvict.class));
    }

    static class InstantHolder {
        private Instant createdAt;

        public Instant getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(Instant createdAt) {
            this.createdAt = createdAt;
        }
    }
}
