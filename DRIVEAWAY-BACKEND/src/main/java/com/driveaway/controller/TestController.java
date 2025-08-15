package com.driveaway.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.driveaway.entity.Test;
import com.driveaway.service.TestService;

@RestController
@CrossOrigin("*")
public class TestController {
	
	@Autowired
	private TestService service;
	
	public TestController(TestService service) { // Spring injects the implementation here
        this.service = service;
    }
	
	@GetMapping("/")
	public String testHome() {
		return "Hello there !!";
	}
	
	@PostMapping("/add")
	public String addTest(@RequestBody Test test) {
		return service.addTest(test);
	}
	
	@GetMapping("/getAll")
	public List<Test> findAll(){
		return service.allTests();
	}
	
	@DeleteMapping("/delete/{tid}")
	public String deleteTest(@PathVariable String tid) {
		return service.removeTest(tid);
	}
}
