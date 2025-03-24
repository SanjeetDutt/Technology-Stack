package in.sanjeetdutt.zohocloneapp.main.controller;

import in.sanjeetdutt.zohocloneapp.dto.response.ErrorResponse;
import in.sanjeetdutt.zohocloneapp.exception._BaseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class ExceptionHandlingController {

    @ExceptionHandler(_BaseException.class)
    public ResponseEntity<ErrorResponse> handleException(_BaseException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .error(ex.getMessage())
                .errorCode(ex.getHttpStatus().value())
                .build();
        return new ResponseEntity<>(errorResponse, ex.getHttpStatus());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleException(NoResourceFoundException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .error("Not able to find " + ex.getResourcePath())
                .errorCode(ex.getStatusCode().value())
                .build();
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleException(HttpRequestMethodNotSupportedException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .error(ex.getMethod() + " method is not supported")
                .errorCode(ex.getStatusCode().value())
                .build();
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }

}
