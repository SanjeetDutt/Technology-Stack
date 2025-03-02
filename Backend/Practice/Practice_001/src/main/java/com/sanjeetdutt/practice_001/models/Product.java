package com.sanjeetdutt.practice_001.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product extends BaseModel{
    private String name;
    private String description;
    private int price;
    private String imageUrl;





    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
