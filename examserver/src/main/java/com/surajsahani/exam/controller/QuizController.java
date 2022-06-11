package com.surajsahani.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.surajsahani.exam.entities.exam.Category;
import com.surajsahani.exam.entities.exam.Quiz;
import com.surajsahani.exam.services.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizService quizService;

	// add quiz
	@PostMapping("/")
	public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz) {
		Quiz category1 = this.quizService.addQuiz(quiz);
		return ResponseEntity.ok(category1);
	}

	// get quiz

	@GetMapping("/{qid}")
	public Quiz getQuiz(@PathVariable("qid") Long qid) {
		return this.quizService.getQuiz(qid);
	}

	// get all quizzes
	@GetMapping("/")
	public ResponseEntity<?> getQuizzes() {
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}

	// update
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizService.updateQuiz(quiz);
	}

	// delete quiz
	@DeleteMapping("/{qid}")
	public void deleteQuiz(@PathVariable("qid") Long qid) {
		this.quizService.deleteQuiz(qid);
	}

	@GetMapping("/category/{cid}")
	public ResponseEntity<?> getQuizzesOfCategory(@PathVariable("cid") Long cid) {

		Category category = new Category();
		category.setCId(cid);
		return ResponseEntity.ok(this.quizService.getQuizzesOfCategory(category));
	}
	
	//get active quizzes
	
	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes(){
		return this.quizService.getActiveQuizzes();
	}
	
	//get active quizzes of category
	
		@GetMapping("/category/active/{cid}")
		public List<Quiz> getActiveQuizzes(@PathVariable("cid") Long cid){
			Category category=new Category();
			category.setCId(cid);
			return this.quizService.getActiveQuizzesOfCategory(category);
		}

	
}
