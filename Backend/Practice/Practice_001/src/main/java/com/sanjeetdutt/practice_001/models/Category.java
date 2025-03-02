package com.sanjeetdutt.practice_001.models;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class Category extends BaseModel{
    private String name;
    private String description;
//    private List<Product> products;
}
