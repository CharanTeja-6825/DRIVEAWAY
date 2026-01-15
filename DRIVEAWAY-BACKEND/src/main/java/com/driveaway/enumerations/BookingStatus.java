package com.driveaway.enumerations;

public enum BookingStatus {
    APPROVED, /// This operation is done by the dealer.
    REJECTED, /// This is done by the dealer.
    ACTIVE, /// This is used in between the period they have booked.
    COMPLETED, /// Done after the active period is complete.
    PENDING, /// Done After Booking is created.
    CANCELLED, /// Done after approval (Optionally Done by Customer).
    AVAILABLE /// The Default Status for all Cars.
}
