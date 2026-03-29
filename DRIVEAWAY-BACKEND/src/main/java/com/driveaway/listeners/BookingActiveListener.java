package com.driveaway.listeners;

import com.driveaway.events.BookingActiveEvent;
import com.driveaway.service.integrations.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingActiveListener implements ApplicationListener<BookingActiveEvent> {

    @Autowired
    private EmailService emailService;

    @Override
    @EventListener
    @Async
    public void onApplicationEvent(BookingActiveEvent event) {
        // Send email to customer that their ride has started
        emailService.sendRideStartedEmailToCustomer(event.getBooking());
        
        // Send email to dealer that the rental period has started
        emailService.sendRideStartedEmailToDealer(event.getBooking());
    }
}
