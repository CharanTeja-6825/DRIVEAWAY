package com.driveaway.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveaway.entity.Test;
import com.driveaway.repository.TestRepository;

@Service
public class TestServiceImplementation implements TestService{

	@Autowired
	private TestRepository repository;
	
	
	@Override
	public String addTest(Test test) {
		test.setTestId(UUID.randomUUID().toString().split("-")[0]);
		repository.save(test);
		return test.toString();
	}

	@Override
	public List<Test> allTests() {
		return repository.findAll();
	}

	@Override
	public String removeTest(String id) {
		repository.deleteById(id);
		return "Test deleted successfully";
	}
	
}
