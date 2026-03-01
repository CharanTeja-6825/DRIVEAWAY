package com.driveaway.enumerations;

public enum BookingStatus {

    // Booking Statuses
    APPROVED, /// This operation is done by the dealer.
    PAID ,/// Payment is done after approval of booking.
    REJECTED, /// This is done by the dealer.
    CANCELLED, /// Done after approval (Optionally Done by Customer).
    AVAILABLE, /// The Default Status for all Cars.
    BOOKED, /// Once Booking is approved the status of car becomes Booked.
    EXPIRED, /// If the Booking request crosses 30 mins time period.
    REVIEWED, /// Car Must be Reviewed after the ride.
    EXPIRED_COOLING, /// Life cycle for a booking ends here.

    // Used for Both Booking and Car entities.
    PENDING, /// Done After Booking is created and also on Car Status.

    // Car Statuses
    ACTIVE, /// This is used in between the period they have booked.
    COMPLETED, /// Done after the active period is complete.
    MAINTENANCE /// Used to stop a car temporarily from its service, on the dealer side.

}
