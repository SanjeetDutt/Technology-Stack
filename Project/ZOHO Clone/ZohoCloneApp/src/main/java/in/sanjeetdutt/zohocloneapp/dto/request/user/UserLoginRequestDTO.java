package in.sanjeetdutt.zohocloneapp.dto.request.user;

import in.sanjeetdutt.zohocloneapp.dto.request._RequestDTO;
import in.sanjeetdutt.zohocloneapp.exception.ValidationException;
import in.sanjeetdutt.zohocloneapp.utility.Validation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequestDTO extends _RequestDTO {
    private String email;
    private String password;


    @Override
    public void validate() {

        if(email == null || email.isEmpty() || !Validation.emailValidation(email))
            throw new ValidationException("Please provide a valid email");

        if(password == null || password.isEmpty() || !Validation.passwordValidation(password))
            throw new ValidationException("Please provide a valid password");

    }
}
