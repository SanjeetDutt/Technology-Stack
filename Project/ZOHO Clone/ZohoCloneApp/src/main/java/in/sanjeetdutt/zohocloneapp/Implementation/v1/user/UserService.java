package in.sanjeetdutt.zohocloneapp.Implementation.v1.user;

import in.sanjeetdutt.zohocloneapp.data.model.user.Authority;
import in.sanjeetdutt.zohocloneapp.data.model.user.Password;
import in.sanjeetdutt.zohocloneapp.data.model.user.User;
import in.sanjeetdutt.zohocloneapp.data.repository.user.PasswordRepository;
import in.sanjeetdutt.zohocloneapp.data.repository.user.UserRepository;
import in.sanjeetdutt.zohocloneapp.exception.InternalServerError;
import in.sanjeetdutt.zohocloneapp.main.configuration.ApplicationConfiguration;
import in.sanjeetdutt.zohocloneapp.main.service.user.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordRepository passwordRepository;

    @Override
    @Transactional
    public Optional<User> createUser(String email, String password, String firstName, String lastName) {
        List<Authority> authorities = List.of(
                Authority.CREATE_EMPLOYEE,
                Authority.UPDATING_ROLE,
                Authority.ASSIGNING_ROLE
        );
        User user = User.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .authorities(authorities)
                .build();
        Password newPassword = createNewPassword(user, password);
        userRepository.save(user);
        passwordRepository.save(newPassword);
        return Optional.of(user);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Boolean checkPassword(User user, String password) {
        Password activePassword = getActivePassword(user);
        return activePassword.getPassword().equals(password);
    }

    @Override
    @Transactional
    public void updatePassword(User user, String password) {
        //Expire the old password
        Password oldPassword = getActivePassword(user);
        oldPassword.setExpireAt(LocalDateTime.now());
        passwordRepository.save(oldPassword);

        //Add new password
        createNewPassword(user, password);
    }

    private String encryptPassword(String password) {
        return password;//TODO: add encryption to password
    }

    private Password createNewPassword (User user, String password){

        String encryptedPassword = encryptPassword(password);
        Password newPassword = Password.builder()
                .password(encryptedPassword)
                .expireAt(LocalDateTime.now().plusDays(ApplicationConfiguration.PASSWORD_EXPIRY_DAYS))
                .user(user)
                .build();

        user.addPassword(newPassword);
        return newPassword;
    }

    private Password getActivePassword (User user){
        Optional<Password> optionalPassword = user.getActivePassword();
        if(optionalPassword.isEmpty()){
            throw new InternalServerError("No active password found. Please try to reset your password.");
        }
        return optionalPassword.get();
    }
}
