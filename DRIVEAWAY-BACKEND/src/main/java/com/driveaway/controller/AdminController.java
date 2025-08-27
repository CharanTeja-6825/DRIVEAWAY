package com.driveaway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.Dealer;
import com.driveaway.service.AdminService;
import com.driveaway.service.BookingService;
import com.driveaway.service.CarService;
import com.driveaway.service.CustomerService;
import com.driveaway.service.DealerService;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  private AdminService adminService;

  // @Autowired
  // private CustomerService customerService;
  //
  // @Autowired
  // private DealerService dealerService;
  //
  // @Autowired
  // private BookingService bookingService;
  //
  // @Autowired
  // private CarService carService;

  @GetMapping("/")
  public String adminHome() {
    return "this is root uri for admin";
  }

  @GetMapping("/test url")
  public String testHome() {
    return "this url is added from NeoVim";
  }

  @PutMapping("/approve")
  public String approveDealer(@RequestParam("did") String did) {
    return adminService.approveDealer(did);
  }

}
