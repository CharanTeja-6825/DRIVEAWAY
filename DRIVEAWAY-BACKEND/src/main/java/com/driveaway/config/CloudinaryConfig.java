package com.driveaway.config;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud}")
    private String cloudinaryCloud;

    @Value("${cloudinary.key}")
    private String cloudinaryKey;

    @Value("${cloudinary.secret}")
    private String cloudinarySecret;


    @Bean
    public Cloudinary cloudinary(){

        if (cloudinaryCloud != null && cloudinaryCloud.startsWith("cloudinary://")) {
            return new Cloudinary(cloudinaryCloud);
        }

        Cloudinary myCloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudinaryCloud,
                "api_key", cloudinaryKey,
                "api_secret", cloudinarySecret
                ));

        return myCloudinary;
    }
}
