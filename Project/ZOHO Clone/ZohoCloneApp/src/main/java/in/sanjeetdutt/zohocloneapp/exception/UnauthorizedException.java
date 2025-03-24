package in.sanjeetdutt.zohocloneapp.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends _BaseException {
    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
