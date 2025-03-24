package in.sanjeetdutt.zohocloneapp.dto.response.user;

import in.sanjeetdutt.zohocloneapp.data.model.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserResponseDTO {

    private String token;
    private String firstName;
    private String lastName;

    public static UserResponseDTO getUserResponseDTO(User user) {
        return UserResponseDTO.builder()
                .token("HERE COME YOUR TOKEN")
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
}
