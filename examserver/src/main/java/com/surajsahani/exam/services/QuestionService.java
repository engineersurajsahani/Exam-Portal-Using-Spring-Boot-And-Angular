package com.surajsahani.exam.services;

import java.util.Set;

import com.surajsahani.exam.entities.exam.Question;
import com.surajsahani.exam.entities.exam.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);

	public Question updateQuestion(Question question);

	public Set<Question> getQuestions();

	public Question getQuestion(Long questionId);

	public void deleteQuestion(Long questionId);
	
	public Set<Question> getQuestionsOfQuiz(Quiz quiz);
	
	public Question get(Long questionId);


}
