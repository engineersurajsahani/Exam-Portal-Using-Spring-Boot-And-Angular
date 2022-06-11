package com.surajsahani.exam.services.impl;

import java.util.HashSet;
import java.util.Set;

import com.surajsahani.exam.entities.exam.Question;
import com.surajsahani.exam.entities.exam.Quiz;
import com.surajsahani.exam.repositories.QuestionRepository;
import com.surajsahani.exam.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService{

	@Autowired
	private QuestionRepository questionRepository;
	
	@Override
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Set<Question> getQuestions() {
		return new HashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long questionId) {
		return this.questionRepository.findById(questionId).get();
	}

	@Override
	public void deleteQuestion(Long questionId) {
		Question question=new Question();
		question.setQuesId(questionId);
		this.questionRepository.delete(question);
		
	}

	@Override
	public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public Question get(Long questionId) {
		return this.questionRepository.findById(questionId).get();
				
				
	}
	
	

}
