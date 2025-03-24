package in.sanjeetdutt.zohocloneapp.exception;

import org.springframework.http.HttpStatus;

public abstract class _BaseException extends RuntimeException{
    _BaseException(String message){
        super(message);
    }

    public abstract HttpStatus getHttpStatus();
}
