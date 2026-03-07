package com.driveaway.listeners;


import com.driveaway.events.BookingPaidEvent;
import com.driveaway.service.integrations.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class BookingPaidListener implements ApplicationListener<BookingPaidEvent> {

    @Autowired
    private EmailService emailService;


    @Async
    @EventListener
    @Override
    public void onApplicationEvent(BookingPaidEvent event) {

    }
}
