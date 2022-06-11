package com.surajsahani.exam.services.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import com.surajsahani.exam.entities.exam.Category;
import com.surajsahani.exam.repositories.CategoryRepository;
import com.surajsahani.exam.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	
	@Override
	public Category addCategory(Category category) {
		
		return this.categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category) {
		return this.categoryRepository.save(category);
	}

	@Override
	public Set<Category> getCategories() {
		return new LinkedHashSet<>(this.categoryRepository.findAll());
	}

	@Override
	public Category getCategory(Long categoryId) {
		return this.categoryRepository.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(Long categoryId) {
		Category category=new Category();
		category.setCId(categoryId);
	    this.categoryRepository.delete(category);
		
	}

}
