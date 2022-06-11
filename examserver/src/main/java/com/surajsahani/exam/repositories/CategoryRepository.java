package com.surajsahani.exam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.surajsahani.exam.entities.exam.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>{

}
