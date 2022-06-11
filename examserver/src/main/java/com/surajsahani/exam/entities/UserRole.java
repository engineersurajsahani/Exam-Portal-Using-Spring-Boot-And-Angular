package com.surajsahani.exam.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserRole {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userRoleId;
	
	//user
	@ManyToOne(fetch=FetchType.EAGER)
	@EqualsAndHashCode.Exclude 
	@ToString.Exclude 
	private User user;
	
	//user
		@ManyToOne(fetch=FetchType.EAGER)
		@EqualsAndHashCode.Exclude 
		@ToString.Exclude 
		private Role role;

}
