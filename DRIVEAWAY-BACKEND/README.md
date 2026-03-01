# DRIVEAWAY Backend Caching Notes

## Redis configuration used in this project

- Redis is configured through Spring Cache (`@EnableCaching`) and a custom `RedisConfig`.
- Connection uses `spring.data.redis.host` and `spring.data.redis.port` from `application.properties`.
- Cache entries use the TTL from `spring.cache.redis.time-to-live` (`30000` ms currently).

## Instant serialization

Redis cache values are stored as JSON.  
`Instant` is explicitly serialized/deserialized as ISO-8601 text (`DateTimeFormatter.ISO_INSTANT`) in `RedisConfig` so date-time values are consistent and readable in cache payloads.

## Which endpoint is cached

`GET /api/customer/get/cars` now uses cached data through:

- `CarServiceImpl#allCars()` → `@Cacheable("cars")`

Cache invalidation for this cache is handled automatically when cars change:

- `CarServiceImpl#addCar(...)` → `@CacheEvict(value = "cars", allEntries = true)`
- `CarServiceImpl#updateCar(...)` → `@CacheEvict(value = "cars", allEntries = true)`
- `CarServiceImpl#deleteCar(...)` → `@CacheEvict(value = "cars", allEntries = true)`

This keeps reads fast while ensuring cache is refreshed after write operations.
