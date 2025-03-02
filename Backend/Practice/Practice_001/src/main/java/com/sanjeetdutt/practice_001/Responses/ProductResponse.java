package com.sanjeetdutt.practice_001.Responses;

import com.sanjeetdutt.practice_001.models.Product;
import com.sanjeetdutt.practice_001.models.Status;

public class ProductResponse {
    String name;
    String description;
    String imageUrl;
    Integer price;
    String status;

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
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

    public static ProductResponse GetProductResponse(Product product){
        ProductResponse productResponse = new ProductResponse();

        productResponse.setDescription(product.getDescription());
        productResponse.setName(product.getName());
        productResponse.setImageUrl(product.getImageUrl());
        productResponse.setPrice(product.getPrice());
        productResponse.setStatus(product.getStatus());

        return productResponse;
    }
}
