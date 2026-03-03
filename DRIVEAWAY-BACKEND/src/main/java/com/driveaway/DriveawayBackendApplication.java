package com.driveaway;

import com.cloudinary.Cloudinary;
import com.cloudinary.SingletonManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableCaching
@EnableAsync
public class DriveawayBackendApplication {

	@Autowired
	private static Cloudinary cloudinary;

	public static void main(String[] args) {
		SpringApplication.run(DriveawayBackendApplication.class, args);
		System.out.println("Jaiii Balayyyaa...!!!");

		SingletonManager singletonManager = new SingletonManager();
		singletonManager.setCloudinary(cloudinary);
		singletonManager.init();
	}

}
