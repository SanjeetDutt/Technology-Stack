package com.sanjeetdutt.practice_001.services;

import com.sanjeetdutt.practice_001.Repositories.CategoryRepository;
import com.sanjeetdutt.practice_001.Repositories.ProductRepository;
import com.sanjeetdutt.practice_001.models.Category;
import com.sanjeetdutt.practice_001.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;

    public Product getProductById(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.orElse(null);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        if(optionalCategory.isEmpty()){
            return null;
        }

        Optional<List<Product>> optionalProducts = productRepository.findAllByCategory(optionalCategory.get());

        return optionalProducts.orElse(null);
    }
}
