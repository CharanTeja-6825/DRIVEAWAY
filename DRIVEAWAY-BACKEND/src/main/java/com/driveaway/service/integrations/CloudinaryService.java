package com.driveaway.service.integrations;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CloudinaryService {
    public String uploadProfile(String userId, MultipartFile profileImage) throws Exception;
    public List<String> uploadCarImages(String carId, MultipartFile[] carImages) throws Exception;
}
