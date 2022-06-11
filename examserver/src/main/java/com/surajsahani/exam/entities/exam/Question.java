package com.surajsahani.exam.entities.exam;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long quesId;
	@Column(length=5000)
	private String content;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	private String answer;
	@Transient
	private String givenAnswer;
	
	
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	private Quiz quiz;

}
