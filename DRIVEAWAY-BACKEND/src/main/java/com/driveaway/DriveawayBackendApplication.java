package com.driveaway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableCaching
public class DriveawayBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DriveawayBackendApplication.class, args);
		System.out.println("Jaiii Balayyyaa...!!!");
	}

}
