package com.sanjeetdutt.practice_001.Repositories;

import com.sanjeetdutt.practice_001.models.Category;
import com.sanjeetdutt.practice_001.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findById(Long id);

    Optional<List<Product>> findAllByCategory(Category category);
}
