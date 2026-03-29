package com.driveaway.dto;

import java.time.Instant;

public class ReviewDTO {
    private String reviewId;
    private String bookingId;
    private String carId;
    private String customerId;
    private String customerName;
    private String customerProfileUrl;
    private String review;
    private int starRating;
    private Instant createdAt;
    private Instant updatedAt;

    // Default constructor
    public ReviewDTO() {}

    // Constructor for aggregation results
    public ReviewDTO(String reviewId, String bookingId, String carId, String customerId, 
                    String customerName, String customerProfileUrl, String review, 
                    int starRating, Instant createdAt, Instant updatedAt) {
        this.reviewId = reviewId;
        this.bookingId = bookingId;
        this.carId = carId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerProfileUrl = customerProfileUrl;
        this.review = review;
        this.starRating = starRating;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getCarId() {
        return carId;
    }

    public void setCarId(String carId) {
        this.carId = carId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerProfileUrl() {
        return customerProfileUrl;
    }

    public void setCustomerProfileUrl(String customerProfileUrl) {
        this.customerProfileUrl = customerProfileUrl;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getStarRating() {
        return starRating;
    }

    public void setStarRating(int starRating) {
        this.starRating = starRating;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
