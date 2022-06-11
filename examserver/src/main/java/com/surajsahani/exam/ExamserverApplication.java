package com.surajsahani.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.surajsahani.exam.entities.Role;
import com.surajsahani.exam.entities.User;
import com.surajsahani.exam.entities.UserRole;
import com.surajsahani.exam.services.UserService;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private  UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Server Started....");
		
//		User user=new User();
//		user.setFirstName("Suraj");
//		user.setLastName("Sahani");
//		user.setUsername("surajsahani");
//		user.setPassword(this.bCryptPasswordEncoder.encode("surajsahani"));
//		user.setEmail("surajsahani@gmail.com");
//		user.setProfile("default.png");
//		
//		Role role=new Role();
//		role.setRoleId(1L);
//		role.setRoleName("ADMIN");
//		
//		
//		UserRole userRole=new UserRole();
//		userRole.setUser(user);
//		userRole.setRole(role);
//		
//		Set<UserRole> userRoleSet=new HashSet<UserRole>();
//		userRoleSet.add(userRole);
//		System.out.println("Calling Service\n");
//		User user1=this.userService.createUser(user, userRoleSet);
//		System.out.println(user1.getUsername());
//		System.out.println("Admin is successfully created");
		
		
		
		
		
	}

}
