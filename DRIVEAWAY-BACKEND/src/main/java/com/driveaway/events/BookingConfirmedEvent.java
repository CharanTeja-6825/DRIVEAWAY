package com.driveaway.events;

import com.driveaway.entity.Booking;
import org.springframework.context.ApplicationEvent;

public class BookingConfirmedEvent extends ApplicationEvent {
    private Booking booking;

    public BookingConfirmedEvent(Booking booking){
        super(booking);
        this.booking = booking;
    }

    public Booking getBooking() {
        return booking;
    }
}
