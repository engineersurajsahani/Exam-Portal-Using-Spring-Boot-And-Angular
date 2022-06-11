package com.surajsahani.exam.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.surajsahani.exam.entities.exam.Category;
import com.surajsahani.exam.entities.exam.Quiz;
import com.surajsahani.exam.repositories.QuizRepository;
import com.surajsahani.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements QuizService{

	@Autowired
	private QuizRepository quizRepository;
	
	@Override
	public Quiz addQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizzes() {
		return new HashSet<>(this.quizRepository.findAll());
	}

	@Override
	public Quiz getQuiz(Long quizId) {
		return this.quizRepository.findById(quizId).get();
	}

	@Override
	public void deleteQuiz(Long quizId) {
		
		this.quizRepository.deleteById(quizId);
		
	}

	@Override
	public List<Quiz> getQuizzesOfCategory(Category category) {
		return this.quizRepository.findByCategory(category);
	}
	
	//get active quizzes

	@Override
	public List<Quiz> getActiveQuizzes() {
		return this.quizRepository.findByActive(true);
		
	}

	@Override
	public List<Quiz> getActiveQuizzesOfCategory(Category category) {
		return this.quizRepository.findByCategoryAndActive(category, true);
	}

}
