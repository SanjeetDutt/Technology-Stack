package com.sanjeetdutt.practice_001.controllers;

import com.sanjeetdutt.practice_001.Responses.ProductResponse;
import com.sanjeetdutt.practice_001.models.Product;
import com.sanjeetdutt.practice_001.models.Status;
import com.sanjeetdutt.practice_001.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/{id}")
    public ProductResponse GetProductById(@PathVariable Long id){
        return ProductResponse.GetProductResponse(productService.getProductById(id));
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> GetProductByCategory(@PathVariable Long categoryId){
        /*List<ProductResponse> productResponseList = new ArrayList<>();

        for(Product product : productService.getProductsByCategory(categoryId)){
            productResponseList.add(
                    GetProductResponse(product)
            );
        }

        return productResponseList;*/

        return productService.getProductsByCategory(categoryId)
                .stream()
                .filter(product -> product.getStatus() == Status.ACTIVE)
                .map(ProductResponse::GetProductResponse)
                .toList();
    }


}
