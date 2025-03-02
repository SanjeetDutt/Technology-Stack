package com.sanjeetdutt.practice_001.Repositories;

import com.sanjeetdutt.practice_001.models.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {
//    Optional<Category> findById(Long id);
}
