package com.driveaway.events;

import com.driveaway.entity.Booking;
import org.springframework.context.ApplicationEvent;


public class BookingCreatedEvent extends ApplicationEvent {

    private Booking booking;

    public BookingCreatedEvent(Booking booking) {
        super(booking);
        this.booking = booking;
    }

    public Booking getBooking(){
        return booking;
    }

}
