package com.driveaway.listeners;

import com.driveaway.events.BookingRejectedEvent;
import com.driveaway.service.integrations.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingRejectedListener implements ApplicationListener<BookingRejectedEvent> {

    @Autowired
    private EmailService emailService;

    @Async
    @EventListener
    @Override
    public void onApplicationEvent(BookingRejectedEvent event) {

    }
}
