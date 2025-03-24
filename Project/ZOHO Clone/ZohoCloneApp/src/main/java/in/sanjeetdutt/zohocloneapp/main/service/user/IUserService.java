package in.sanjeetdutt.zohocloneapp.main.service.user;

import in.sanjeetdutt.zohocloneapp.data.model.user.User;

import java.util.Optional;

public interface IUserService {
    Optional<User> getUserByEmail(String email);
    Boolean checkPassword(User user, String password);
    Optional<User> createUser(String email, String password, String firstName, String lastName);
    void updatePassword(User user, String password);
}
