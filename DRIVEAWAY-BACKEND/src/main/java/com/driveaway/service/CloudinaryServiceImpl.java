package com.driveaway.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService{

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadProfile(String userId, MultipartFile profileImage) throws Exception {

        Map uploadResult = cloudinary.uploader().upload(profileImage.getBytes(),
                ObjectUtils.asMap(
                        "folder", "avatars/",
                        "public_id", userId,
                        "overwrite", true
        ));

        System.out.println(uploadResult.get("secure_url").toString());

        return uploadResult.get("secure_url").toString();
    }
    
}
