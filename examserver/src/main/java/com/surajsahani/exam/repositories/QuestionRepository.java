package com.surajsahani.exam.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.surajsahani.exam.entities.exam.Question;
import com.surajsahani.exam.entities.exam.Quiz;


@Repository
public interface QuestionRepository extends JpaRepository<Question,Long>{

	public Set<Question> findByQuiz(Quiz quiz);
}
