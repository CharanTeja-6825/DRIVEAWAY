package com.driveaway.exception;

public class BookingNotFoundException extends Exception{
    public BookingNotFoundException(String message){
        super("Error : "+message);
    }
}
