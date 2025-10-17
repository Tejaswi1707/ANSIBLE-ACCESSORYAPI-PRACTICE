package com.klef.practice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class AccessoryapiBackendApplication extends SpringBootServletInitializer
{

	public static void main(String[] args) {
		SpringApplication.run(AccessoryapiBackendApplication.class, args);
		System.out.println("Project is Running :)");
	}

}
