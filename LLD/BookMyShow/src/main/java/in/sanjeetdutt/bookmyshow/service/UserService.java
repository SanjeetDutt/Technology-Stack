package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.User;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<User> {

    public UserService(GenericRepository<User> repository) {
        super(repository);
    }

    public void addUser(String name, String email){
        User user= User.builder().name(name).email(email).build();
        super.add(user);
    }
}
