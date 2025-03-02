package com.sanjeetdutt.practice_001.controllers;

import com.sanjeetdutt.practice_001.models.Product;
import com.sanjeetdutt.practice_001.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/{id}")
    public Product GetProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> GetProductByCategory(@PathVariable Long categoryId){
        return productService.getProductsByCategory(categoryId);
    }
}
