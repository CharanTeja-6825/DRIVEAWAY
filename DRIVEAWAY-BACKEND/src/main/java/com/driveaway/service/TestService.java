package com.driveaway.service;

import java.util.List;

import com.driveaway.entity.Test;

public interface TestService {
	public String addTest(Test test);
	public List<Test> allTests();
	public String removeTest(String id);
//	public String updateTest(int id);
}
