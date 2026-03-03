package com.driveaway.listeners;

import com.driveaway.events.BookingCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingCreatedListener{

    @EventListener
    @Async
    public void handleCreateBookingEvent(BookingCreatedEvent bookingCreatedEvent){
        System.out.println(bookingCreatedEvent.getBooking().toString());
    }
}
