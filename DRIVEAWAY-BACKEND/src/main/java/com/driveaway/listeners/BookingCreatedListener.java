package com.driveaway.listeners;

import com.driveaway.events.BookingCreatedEvent;
import com.driveaway.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingCreatedListener{

    @Autowired
    private EmailService emailService;

    @EventListener
    @Async
    public void handleCreateBookingEvent(BookingCreatedEvent bookingCreatedEvent){
        emailService.sendBookingApprovedEmail(bookingCreatedEvent.getBooking());
        System.out.println(bookingCreatedEvent.getBooking().toString());
    }
}
