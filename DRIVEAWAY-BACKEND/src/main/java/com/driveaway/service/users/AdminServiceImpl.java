package com.driveaway.service.users;

import com.driveaway.dto.AdminAnalyticsDTO;
import com.driveaway.dto.ReviewDTO;
import com.driveaway.entity.analytics.Review;
import com.driveaway.entity.bookings.Booking;
import com.driveaway.entity.bookings.Car;
import com.driveaway.entity.users.User;
import com.driveaway.enumerations.BookingStatus;
import com.driveaway.enumerations.Roles;
import com.driveaway.repository.users.DealerRepository;
import com.driveaway.repository.analytics.DealerApplicationRepository;
import com.driveaway.repository.analytics.ReviewRepository;
import com.driveaway.repository.bookings.BookingRepository;
import com.driveaway.repository.bookings.CarRepository;
import com.driveaway.repository.users.AdminRepository;
import com.driveaway.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DealerRepository dealerRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private CarRepository carRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private DealerApplicationRepository dealerApplicationRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Cacheable(value = "users", unless = "#result == null || #result.isEmpty()")
	@Override
	public List<User> getAllUsers() {
		return adminRepository.findAll();
	}

	@Override
	public AdminAnalyticsDTO getAnalytics() {
		AdminAnalyticsDTO analytics = new AdminAnalyticsDTO();

		// User statistics
		List<User> allUsers = userRepository.findAll();
		analytics.setTotalUsers(allUsers.size());
		analytics.setTotalCustomers(allUsers.stream()
				.filter(u -> Roles.CUSTOMER.toString().equals(u.getRole()))
				.count());
		analytics.setTotalDealers(dealerRepository.count());
		analytics.setPendingApplications(dealerApplicationRepository.countByApprovalStatus("PENDING"));

		// Booking statistics
		List<Booking> allBookings = bookingRepository.findAll();
		analytics.setTotalBookings(allBookings.size());
		analytics.setActiveBookings(allBookings.stream()
				.filter(b -> BookingStatus.ACTIVE.toString().equals(b.getStatus()))
				.count());
		analytics.setCompletedBookings(allBookings.stream()
				.filter(b -> BookingStatus.COMPLETED.toString().equals(b.getStatus()))
				.count());
		analytics.setCancelledBookings(allBookings.stream()
				.filter(b -> BookingStatus.CANCELLED.toString().equals(b.getStatus()))
				.count());
		
		// Calculate total revenue from completed/paid bookings
		double totalRevenue = allBookings.stream()
				.filter(b -> BookingStatus.COMPLETED.toString().equals(b.getStatus()) 
						|| BookingStatus.PAID.toString().equals(b.getStatus())
						|| BookingStatus.ACTIVE.toString().equals(b.getStatus()))
				.mapToDouble(Booking::getTotalAmount)
				.sum();
		analytics.setTotalRevenue(totalRevenue);

		// Car statistics
		List<Car> allCars = carRepository.findAll();
		analytics.setTotalCars(allCars.size());
		analytics.setAvailableCars(allCars.stream()
				.filter(c -> BookingStatus.AVAILABLE.toString().equals(c.getCarStatus()))
				.count());

		// Review statistics
		List<Review> allReviews = reviewRepository.findAll();
		analytics.setTotalReviews(allReviews.size());

		// Calculate average rating
		if (!allReviews.isEmpty()) {
			double avgRating = allReviews.stream()
					.mapToInt(Review::getStarRating)
					.average()
					.orElse(0.0);
			analytics.setAveragePlatformRating(Math.round(avgRating * 10.0) / 10.0);
		} else {
			analytics.setAveragePlatformRating(0.0);
		}

		// Reviews this month
		Instant startOfMonth = Instant.now().truncatedTo(ChronoUnit.DAYS).minus(30, ChronoUnit.DAYS);
		long reviewsThisMonth = allReviews.stream()
				.filter(r -> r.getCreatedAt() != null && r.getCreatedAt().isAfter(startOfMonth))
				.count();
		analytics.setReviewsThisMonth(reviewsThisMonth);

		// Recent reviews (last 5)
		List<ReviewDTO> recentReviews = getRecentReviews(5);
		analytics.setRecentReviews(recentReviews);

		return analytics;
	}

	private List<ReviewDTO> getRecentReviews(int limit) {
		Aggregation aggregation = Aggregation.newAggregation(
				Aggregation.sort(Sort.Direction.DESC, "createdAt"),
				Aggregation.limit(limit),
				Aggregation.addFields().addFieldWithValueOf("customerObjId", 
						new org.bson.Document("$toObjectId", "$customerId")).build(),
				Aggregation.lookup("users", "customerObjId", "_id", "customer"),
				Aggregation.unwind("customer", true),
				Aggregation.project()
						.and("_id").as("reviewId")
						.and("bookingId").as("bookingId")
						.and("carId").as("carId")
						.and("customerId").as("customerId")
						.and("customer.userName").as("customerName")
						.and("customer.profileUrl").as("customerProfileUrl")
						.and("review").as("review")
						.and("starRating").as("starRating")
						.and("createdAt").as("createdAt")
						.and("updatedAt").as("updatedAt")
		);

		AggregationResults<ReviewDTO> results = mongoTemplate.aggregate(
				aggregation, "reviews", ReviewDTO.class);
		return results.getMappedResults();
	}
}
