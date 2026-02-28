package com.driveaway.service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService{

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadProfile(String userId, MultipartFile profileImage) throws Exception {

        Map uploadResult = null;
        String imageUrl = null;
        if (!profileImage.isEmpty() && userId != null) {
            imageUrl = cloudinary.uploader().upload(profileImage.getBytes(),
                    Map.of(
                            "resource_type", "image",
                            "folder", "avatars/",
                            "public_id", userId.toString(),
                            "overwrite", true
                    )).get("secure_url").toString();
        }

        return imageUrl;
    }

    @Override
    public List<String> uploadCarImages(String carId, MultipartFile[] carImages) throws Exception {
        Map uploadResult = null;
        List<String> cars = new ArrayList<>();
        for(MultipartFile car : carImages){
            cars.add(
                    cloudinary.uploader().upload(car.getBytes(),
                            Map.of(
                                    "resource_type", "image",
                                    "folder", "cars/"+carId+"/",
                                    "public_id", "view_"+cars.size(),
                                    "overwrite", true
                            )).get("secure_url").toString()
            );
        }
        return cars;
    }
}
