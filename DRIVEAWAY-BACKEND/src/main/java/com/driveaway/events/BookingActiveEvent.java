package com.driveaway.events;

import com.driveaway.entity.bookings.Booking;
import org.springframework.context.ApplicationEvent;

public class BookingActiveEvent extends ApplicationEvent {

    private final Booking booking;

    public BookingActiveEvent(Object source, Booking booking) {
        super(source);
        this.booking = booking;
    }

    public Booking getBooking() {
        return booking;
    }
}
