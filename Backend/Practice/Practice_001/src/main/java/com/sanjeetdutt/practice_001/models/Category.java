package com.sanjeetdutt.practice_001.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Category extends BaseModel{
    private String name;
    private String description;

    /**
     * PRODUCT  : CATEGORY
     * 1        : 1 (A)
     * N        : 1 (B)
     * -----------------------
     * N        : 1 (RESULT)
     */
    @OneToMany
    @JoinColumn(name = "category_id")
    private List<Product> products;


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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
