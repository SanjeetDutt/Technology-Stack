package com.sanjeetdutt.practice_001.controllers;

import com.sanjeetdutt.practice_001.Responses.ErrorResponse;
import com.sanjeetdutt.practice_001.exceptions.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ErrorResponse> handleException(CustomException exception) {
        ErrorResponse errorResponse = new ErrorResponse(exception);
        return new ResponseEntity<>(errorResponse, exception.getHttpStatus());
    }
}
