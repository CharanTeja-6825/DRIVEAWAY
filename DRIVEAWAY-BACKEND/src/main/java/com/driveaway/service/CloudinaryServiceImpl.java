package com.driveaway.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.driveaway.entity.User;
import com.driveaway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class CloudinaryServiceImpl implements CloudinaryService{

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadProfile(String userId, MultipartFile profileImage) throws Exception {

        Map uploadResult = cloudinary.uploader().upload(profileImage.getBytes(),
                ObjectUtils.asMap({
                        "folder", "avatars/",
                        "public_id",userId,
                        "overwrite", true
        ));

        return uploadResult.get("secure_url").toString();
    }
}
