package com.driveaway.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {
    public String uploadProfile(String userId, MultipartFile profileImage) throws Exception;
}
