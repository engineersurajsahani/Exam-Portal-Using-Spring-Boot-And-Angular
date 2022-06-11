package com.surajsahani.exam.entities;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="roles")
public class Role {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long roleId;
	private String roleName;
	
	//user has many roles
		@OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY,mappedBy="role")
		@JsonIgnore
		@EqualsAndHashCode.Exclude 
		@ToString.Exclude 
		private Set<UserRole> userRoles=new HashSet<UserRole>();

}
