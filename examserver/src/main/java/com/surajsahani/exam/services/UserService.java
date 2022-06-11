package com.surajsahani.exam.services;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.surajsahani.exam.entities.User;
import com.surajsahani.exam.entities.UserRole;

public interface UserService {
	
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	
	public User getUserByUsername(String username);
	
	public void deleteUser(Long id);

}
