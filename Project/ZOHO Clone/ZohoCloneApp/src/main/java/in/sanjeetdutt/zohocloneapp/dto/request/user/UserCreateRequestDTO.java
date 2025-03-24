package in.sanjeetdutt.zohocloneapp.dto.request.user;

import in.sanjeetdutt.zohocloneapp.dto.request._RequestDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateRequestDTO extends _RequestDTO {

    String firstName;
    String lastName;
    String password;
    String email;


    @Override
    public void validate() {

    }
}
