package com.sanjeetdutt.practice_001.Responses;

import com.sanjeetdutt.practice_001.models.Category;
import com.sanjeetdutt.practice_001.models.Product;
import com.sanjeetdutt.practice_001.models.Status;

import java.util.List;

public class CategoryResponse {
    private String name;
    private String description;
    private String status;
    private List<ProductResponse> products;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        switch (status){
            case ACTIVE :
                this.status = "ACTIVE";
                break;

            default:
                this.status = "DELETED";
        }
    }

    public List<ProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponse> products) {
        this.products = products;
    }

    public static CategoryResponse GetCategoryResponse (Category category){
        CategoryResponse categoryResponse = new CategoryResponse();

        categoryResponse.setName(category.getName());
        categoryResponse.setDescription(category.getDescription());
        categoryResponse.setStatus(category.getStatus());

        List<ProductResponse> products= category.getProducts()
                .stream()
                .map(ProductResponse::GetProductResponse)
                .toList();

        categoryResponse.setProducts(products);

        return categoryResponse;
    }
}
