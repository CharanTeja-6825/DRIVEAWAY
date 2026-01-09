package com.driveaway.entity;
import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dealers")
public class Dealer {

    @Id
    private String id;

    private String userId;

    private String dealershipName;
    private String ownerName;

    @Indexed(unique = true)
    private String gstIn;

    private String location;
    private Instant createdAt;
    private String approvalStatus;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUser() {
		return userId;
	}
	public void setUser(String userId) {
		this.userId = userId;
	}
	public String getDealershipName() {
		return dealershipName;
	}
	public void setDealershipName(String dealershipName) {
		this.dealershipName = dealershipName;
	}
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getGstIn() {
		return gstIn;
	}
	public void setGstIn(String gstIn) {
		this.gstIn = gstIn;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
}
