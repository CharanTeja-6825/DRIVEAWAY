package com.driveaway.service.analytics;

import com.driveaway.dto.DealerRequestDTO;
import com.driveaway.entity.analytics.DealerApplications;
import com.driveaway.entity.users.Dealer;
import com.driveaway.entity.users.User;
import com.driveaway.enumerations.Approval;
import com.driveaway.enumerations.Roles;
import com.driveaway.repository.analytics.DealerApplicationRepository;
import com.driveaway.repository.DealerRepository;
import com.driveaway.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
           app.setUserId(dto.user());
           app.setDealerShipName(dto.dealershipName());
           app.setOwnerName(dto.ownerName());
           app.setGstIn(dto.gstIn());
           app.setLocation(dto.location());
           app.setPhone(dto.phone());
           app.setApprovalStatus(Approval.PENDING.toString());
           app.setCreatedAt(Instant.now());
           dealerApplicationRepository.save(app);
           return "Application submitted";
       } catch (Exception e) {
           return "Application already Exists";
       }
    }

    @Override
    public String approveApplication(String applicationId, boolean approval) {

        String status = approval == true ? Approval.APPROVED.toString() : Approval.REJECTED.toString();

        Optional<DealerApplications> app = dealerApplicationRepository.findById(applicationId);
        if(app.isEmpty()) return "Application not found";

        DealerApplications dealerApp = app.get();

        dealerApp.setApprovalStatus(status);
        dealerApplicationRepository.save(dealerApp);

        Optional<User> user = userRepository.findById(dealerApp.getUserId());
        if(user.isEmpty()) return "User ID mentioned in Application not found";

        User appUser = user.get();
        appUser.setRole(Roles.DEALER.toString());

        userRepository.save(appUser);

        Dealer d = new Dealer();
        d.setUser(dealerApp.getUserId());
        d.setApprovalStatus(status);
        d.setGstIn(dealerApp.getGstIn());
        d.setLocation(dealerApp.getLocation());
        d.setDealershipName(dealerApp.getDealerShipName());
        d.setOwnerName(dealerApp.getOwnerName());
        d.setPhone(dealerApp.getPhone());
        d.setCreatedAt(Instant.now());

        dealerRepository.save(d);
        return approval == true ? "Dealer Approved Successfully" : "Dealer Rejected Successfully";

    }

    public List<DealerApplications> allApplications(){
        return dealerApplicationRepository.findAll().stream()
                .filter(app -> app.getApprovalStatus().equals(Approval.PENDING.toString()))
                .toList();
    }
}
