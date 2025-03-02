package com.sanjeetdutt.practice_001.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundError extends CustomException{
    public NotFoundError(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }

    public NotFoundError(String message, String description) {
        super(HttpStatus.NOT_FOUND, message, description);
    }
}
