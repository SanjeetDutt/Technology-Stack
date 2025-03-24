package in.sanjeetdutt.zohocloneapp.data.repository.user;

import in.sanjeetdutt.zohocloneapp.data.model.user.User;
import in.sanjeetdutt.zohocloneapp.data.repository._BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends _BaseRepository<User> {

    Optional<User> findByEmail(String email);
}
