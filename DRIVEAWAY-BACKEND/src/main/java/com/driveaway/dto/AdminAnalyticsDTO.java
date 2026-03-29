package com.driveaway.dto;

import java.util.List;

public class AdminAnalyticsDTO {

    // User Statistics
    private long totalUsers;
    private long totalCustomers;
    private long totalDealers;
    private long pendingApplications;

    // Booking Statistics
    private long totalBookings;
    private long activeBookings;
    private long completedBookings;
    private long cancelledBookings;
    private double totalRevenue;

    // Review Statistics
    private long totalReviews;
    private double averagePlatformRating;
    private long reviewsThisMonth;
    
    // Car Statistics
    private long totalCars;
    private long availableCars;
    
    // Recent Reviews
    private List<ReviewDTO> recentReviews;

    // Default constructor
    public AdminAnalyticsDTO() {}

    // Getters and Setters
    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalDealers() {
        return totalDealers;
    }

    public void setTotalDealers(long totalDealers) {
        this.totalDealers = totalDealers;
    }

    public long getPendingApplications() {
        return pendingApplications;
    }

    public void setPendingApplications(long pendingApplications) {
        this.pendingApplications = pendingApplications;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getActiveBookings() {
        return activeBookings;
    }

    public void setActiveBookings(long activeBookings) {
        this.activeBookings = activeBookings;
    }

    public long getCompletedBookings() {
        return completedBookings;
    }

    public void setCompletedBookings(long completedBookings) {
        this.completedBookings = completedBookings;
    }

    public long getCancelledBookings() {
        return cancelledBookings;
    }

    public void setCancelledBookings(long cancelledBookings) {
        this.cancelledBookings = cancelledBookings;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    public double getAveragePlatformRating() {
        return averagePlatformRating;
    }

    public void setAveragePlatformRating(double averagePlatformRating) {
        this.averagePlatformRating = averagePlatformRating;
    }

    public long getReviewsThisMonth() {
        return reviewsThisMonth;
    }

    public void setReviewsThisMonth(long reviewsThisMonth) {
        this.reviewsThisMonth = reviewsThisMonth;
    }

    public long getTotalCars() {
        return totalCars;
    }

    public void setTotalCars(long totalCars) {
        this.totalCars = totalCars;
    }

    public long getAvailableCars() {
        return availableCars;
    }

    public void setAvailableCars(long availableCars) {
        this.availableCars = availableCars;
    }

    public List<ReviewDTO> getRecentReviews() {
        return recentReviews;
    }

    public void setRecentReviews(List<ReviewDTO> recentReviews) {
        this.recentReviews = recentReviews;
    }
}
