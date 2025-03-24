package in.sanjeetdutt.zohocloneapp.data.repository.user;

import in.sanjeetdutt.zohocloneapp.data.model.user.Password;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordRepository extends JpaRepository<Password, Long> {


}
