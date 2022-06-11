package com.surajsahani.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.surajsahani.exam.entities.exam.Question;
import com.surajsahani.exam.entities.exam.Quiz;
import com.surajsahani.exam.services.QuizService;
import com.surajsahani.exam.services.QuestionService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@Autowired
	private QuizService quizService;

	// add question
	@PostMapping("/")
	public ResponseEntity<?> addQuestion(@RequestBody Question question) {
		Question category1 = this.questionService.addQuestion(question);
		return ResponseEntity.ok(category1);
	}

	// get question

	@GetMapping("/{questionId}")
	public Question getQuestion(@PathVariable("questionId") Long questionId) {
		return this.questionService.getQuestion(questionId);
	}

	// get all questions
	@GetMapping("/")
	public ResponseEntity<?> getQuestions() {
		return ResponseEntity.ok(this.questionService.getQuestions());
	}

	// get all questions of any quiz
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid) {

		Quiz quiz = this.quizService.getQuiz(qid);
		Set<Question> questions = quiz.getQuestions();

		List<Question> list = new ArrayList<>(questions);
		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
		}

		for (Question q : list) {
			q.setAnswer("");
		}

		Collections.shuffle(list);
		return ResponseEntity.ok(list);

	}

	// get all questions of any quiz
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
		Quiz quiz = new Quiz();
		quiz.setQId(qid);
		return ResponseEntity.ok(this.questionService.getQuestionsOfQuiz(quiz));

	}

	// update
	@PutMapping("/")
	public Question updateQuestion(Question question) {
		return this.questionService.updateQuestion(question);
	}

	// delete quiz
	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable("questionId") Long questionId) {
		this.questionService.deleteQuestion(questionId);
	}

	// eval quiz
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {

		double marksGot = 0;
		int correctAnswer = 0;
		int attempted = 0;

		for (Question q : questions) {

			Question question = this.questionService.get(q.getQuesId());

			if (question.getAnswer().equals(q.getGivenAnswer())) {
				correctAnswer++;
				double singleMarks = Integer.parseInt(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
				marksGot += singleMarks;

			}
			if (q.getGivenAnswer() == null) {

			} else {
				attempted++;
			}
		}
		;

		Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswer", correctAnswer, "attempted", attempted);
		return ResponseEntity.ok(map);

	}

}
