package com.driveaway.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Customer;
import com.driveaway.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{


	@Autowired
	private CustomerRepository repo;
	
	@Override
	public String addCustomer(Customer customer) {
		customer.setCustomer_id(UUID.randomUUID().toString().split("-")[0]);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		customer.setPassword(encoder.encode(customer.getPassword()));
		repo.save(customer);
		return customer.toString()+"\n added successfully !";
	}

	@Override
	public List<Customer> allCustomers() {
		return repo.findAll();
	}

	@Override
	public String deleteCustomer(String customerid) {
		Optional<Customer> custopt = repo.findById(customerid);
		if(custopt.isPresent()) {
			Customer customer = custopt.get();
			repo.delete(customer);
			return customer.getCustomer_name()+" is deleted !";
		}else {
			return "Customer not found !";
		}
		
	}

}
