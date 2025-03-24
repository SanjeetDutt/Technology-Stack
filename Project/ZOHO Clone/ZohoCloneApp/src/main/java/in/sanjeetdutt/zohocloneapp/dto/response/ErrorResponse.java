package in.sanjeetdutt.zohocloneapp.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ErrorResponse extends _ResponseDTO{

    String error;
    int errorCode;
}
