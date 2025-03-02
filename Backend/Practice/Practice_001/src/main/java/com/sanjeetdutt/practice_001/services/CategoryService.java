package com.sanjeetdutt.practice_001.services;

import com.sanjeetdutt.practice_001.Repositories.CategoryRepository;
import com.sanjeetdutt.practice_001.exceptions.NotFoundError;
import com.sanjeetdutt.practice_001.models.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public Category getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isEmpty()){
            throw new NotFoundError("Category not found");
        }
        return category.get();
    }
}
