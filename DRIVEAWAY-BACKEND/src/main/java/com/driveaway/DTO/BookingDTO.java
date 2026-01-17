package com.driveaway.DTO;

import com.driveaway.entity.Dealer;
import com.driveaway.entity.User;
import java.time.Instant;

public class BookingDTO {

    private String bookingId;

    private String carId;

    private String dealerId;

    private String customerId;

    private User user;

    private Instant startDate;
    private Instant endDate;

    private double totalAmount;

    private String status;

    private Instant createdAt;
    private Instant approvedAt;

    public BookingDTO(String bookingId, String carId, String dealerId, String customerId, User user, Instant startDate, Instant endDate, double totalAmount, String status, Instant createdAt, Instant approvedAt) {
        this.bookingId = bookingId;
        this.carId = carId;
        this.dealerId = dealerId;
        this.customerId = customerId;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.approvedAt = approvedAt;
    }

    public String getCarId() {
        return carId;
    }

    public void setCarId(String carId) {
        this.carId = carId;
    }

    public String getDealerId() {
        return dealerId;
    }

    public void setDealerId(String dealerId) {
        this.dealerId = dealerId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Instant approvedAt) {
        this.approvedAt = approvedAt;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
