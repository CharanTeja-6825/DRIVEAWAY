package com.driveaway.listeners;

import com.driveaway.events.BookingCompletedEvent;
import com.driveaway.service.integrations.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingCompletedListener implements ApplicationListener<BookingCompletedEvent> {

    @Autowired
    private EmailService emailService;

    @Override
    @EventListener
    @Async
    public void onApplicationEvent(BookingCompletedEvent event) {
        // Send email to customer that their ride is completed with review request
        emailService.sendRideCompletedEmailToCustomer(event.getBooking());
        
        // Send email to dealer that the rental period has ended
        emailService.sendRideCompletedEmailToDealer(event.getBooking());
    }
}
