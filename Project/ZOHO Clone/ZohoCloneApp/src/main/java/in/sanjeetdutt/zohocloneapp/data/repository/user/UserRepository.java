package in.sanjeetdutt.zohocloneapp.data.repository.user;

import in.sanjeetdutt.zohocloneapp.data.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
