package com.driveaway.schedulers;

import com.driveaway.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BookingScheduler {

    @Autowired
    private BookingService bookingService;

    @Scheduled(cron = "0 */5 * * * *")
    public void expirePendingBookings(){
        System.out.println("cron exec");
        bookingService.expirePendingBookings();
    }
}
