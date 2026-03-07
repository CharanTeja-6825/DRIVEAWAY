package com.driveaway.events;

import com.driveaway.entity.bookings.Order;
import org.springframework.context.ApplicationEvent;

public class BookingPaidEvent extends ApplicationEvent {

    private Order order;

    public BookingPaidEvent(Order order){
        super(order);
        this.order = order;
    }

    public Order getOrder() {
        return order;
    }
}
