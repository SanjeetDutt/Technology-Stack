package com.sanjeetdutt.practice_001.Responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sanjeetdutt.practice_001.exceptions.CustomException;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private String message;
    private String description;

    public ErrorResponse(CustomException ex) {
        this.message = ex.getMessage();
        this.description = ex.getDescription();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
