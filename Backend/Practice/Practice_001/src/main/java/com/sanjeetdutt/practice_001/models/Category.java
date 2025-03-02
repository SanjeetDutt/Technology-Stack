package com.sanjeetdutt.practice_001.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
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
    private Set<Product> products;
}
