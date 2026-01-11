package com.driveaway.service;

import com.driveaway.DTO.DealerRequestDTO;
import com.driveaway.entity.Dealer;
import com.driveaway.entity.DealerApplications;
import com.driveaway.entity.User;
import com.driveaway.enumerations.Approval;
import com.driveaway.enumerations.Roles;
import com.driveaway.repository.DealerApplicationRepository;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class DealerApplicationServiceImpl implements DealerApplicationService {

    @Autowired
    private DealerApplicationRepository dealerApplicationRepository;

    @Autowired
    private DealerRepository dealerRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public String submitApplication(DealerRequestDTO dto) {
       try{
           DealerApplications app = new DealerApplications();
           app.setUserId(dto.getUser());
           app.setDealerShipName(dto.getDealershipName());
           app.setOwnerName(dto.getOwnerName());
           app.setGstIn(dto.getGstIn());
           app.setLocation(dto.getLocation());
           app.setApprovalStatus(Approval.PENDING.toString());
           app.setCreatedAt(Instant.now());
           dealerApplicationRepository.save(app);
           return "Application submitted";
       } catch (Exception e) {
           return "Application already Exists";
       }
    }

    @Override
    public String approveApplication(String applicationId) {
        Optional<DealerApplications> app = dealerApplicationRepository.findById(applicationId);
        if(app.isEmpty()) return "Application not found";

        DealerApplications dealerApp = app.get();

        dealerApp.setApprovalStatus(Approval.APPROVED.toString());
        dealerApplicationRepository.save(dealerApp);

        Optional<User> user = userRepository.findById(dealerApp.getUserId());
        if(user.isEmpty()) return "User ID mentioned in Application not found";

        User appUser = user.get();
        appUser.setRole(Roles.DEALER.toString());

        userRepository.save(appUser);

        Dealer d = new Dealer();
        d.setUser(dealerApp.getUserId());
        d.setApprovalStatus(Approval.APPROVED.toString());
        d.setGstIn(dealerApp.getGstIn());
        d.setLocation(dealerApp.getLocation());
        d.setDealershipName(d.getDealershipName());
        d.setOwnerName(dealerApp.getOwnerName());
        d.setCreatedAt(Instant.now());

        dealerRepository.save(d);
        return "Dealer Approved Successfully";
    }

    public List<DealerApplications> allApplications(){
        return dealerApplicationRepository.findAll().stream()
                .filter(app -> app.getApprovalStatus().equals(Approval.PENDING.toString()))
                .toList();
    }
}
