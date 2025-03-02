package com.sanjeetdutt.practice_001.exceptions;

import com.sanjeetdutt.practice_001.Responses.ErrorResponse;
import org.springframework.http.HttpStatus;

public abstract class CustomException extends RuntimeException {

    private HttpStatus httpStatus;
    private final String message;
    private final String description;

    public CustomException(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.description = null;
    }

    public CustomException(HttpStatus httpStatus, String message, String description) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.description = description;
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public String getDescription() {
        return description;
    }

}
