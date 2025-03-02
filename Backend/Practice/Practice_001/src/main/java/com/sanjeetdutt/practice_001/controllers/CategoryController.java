package com.sanjeetdutt.practice_001.controllers;

import com.sanjeetdutt.practice_001.Responses.CategoryResponse;
import com.sanjeetdutt.practice_001.models.Category;
import com.sanjeetdutt.practice_001.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @RequestMapping("/{categoryId}")
    private CategoryResponse getCategoryById(@PathVariable Long categoryId) {
        return CategoryResponse.GetCategoryResponse(categoryService.getCategoryById(categoryId));
    }


}
