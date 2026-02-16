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
        String cloudConfig = cloudinaryCloud == null ? "" : cloudinaryCloud.trim();
        String apiKey = cloudinaryKey == null ? "" : cloudinaryKey.trim();
        String apiSecret = cloudinarySecret == null ? "" : cloudinarySecret.trim();

        if (cloudConfig.isEmpty()) {
            throw new IllegalStateException("Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME or CLOUDINARY_URL.");
        }

        if (cloudConfig.startsWith("cloudinary://")) {
            return new Cloudinary(cloudConfig);
        }

        if (apiKey.isEmpty() || apiSecret.isEmpty()) {
            throw new IllegalStateException("Cloudinary API credentials are missing. Set CLOUDINARY_KEY and CLOUDINARY_SECRET.");
        }

        Cloudinary myCloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudConfig,
                "api_key", apiKey,
                "api_secret", apiSecret
                ));

        return myCloudinary;
    }
}
