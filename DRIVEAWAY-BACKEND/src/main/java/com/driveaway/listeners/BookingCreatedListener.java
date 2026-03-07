package com.driveaway.listeners;

import com.driveaway.events.BookingCreatedEvent;
import com.driveaway.service.integrations.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingCreatedListener implements ApplicationListener<BookingCreatedEvent> {

    @Autowired
    private EmailService emailService;

    @Override
    @EventListener
    @Async
    public void onApplicationEvent(BookingCreatedEvent bookingCreatedEvent){
        emailService.sendBookingCreationEmail(bookingCreatedEvent.getBooking());
    }
}
