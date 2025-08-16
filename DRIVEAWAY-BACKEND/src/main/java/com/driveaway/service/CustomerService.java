package com.driveaway.service;

import java.util.List;

import com.driveaway.entity.Customer;

public interface CustomerService {
	public String addCustomer(Customer customer);
	public List<Customer> allCustomers();
	public String deleteCustomer(String customerid);
}
