package com.surajsahani.exam.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.surajsahani.exam.entities.User;
import com.surajsahani.exam.entities.UserRole;
import com.surajsahani.exam.repositories.RoleRepository;
import com.surajsahani.exam.repositories.UserRepository;
import com.surajsahani.exam.services.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	

	@Override
	public User createUser(User user, Set<UserRole> userRole) throws Exception {
		
		User local=this.userRepository.findByUsername(user.getUsername());
		
		if(local!=null) {
			System.out.println("User is already there !!");
			throw new Exception("User already present !!");
		}
		else {
			
			for(UserRole ur:userRole) {
				System.out.print("Calling Role");
				roleRepository.save(ur.getRole());
			}
			
			//user.getUserRoles().addAll(userRole);
			user.setUserRoles(userRole);
			System.out.print("Calling User");
			local=this.userRepository.save(user);
		}
		return local;
	}



	@Override
	public User getUserByUsername(String username) {
		User user=this.userRepository.findByUsername(username);
		return user;
	}



	@Override
	public void deleteUser(Long id) {
		this.userRepository.deleteById(id);
		
	}

}
