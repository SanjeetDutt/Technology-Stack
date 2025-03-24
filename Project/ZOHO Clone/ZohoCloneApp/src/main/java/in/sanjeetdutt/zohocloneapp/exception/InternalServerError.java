package in.sanjeetdutt.zohocloneapp.exception;

import org.springframework.http.HttpStatus;

public class InternalServerError extends _BaseException{
    public InternalServerError(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
