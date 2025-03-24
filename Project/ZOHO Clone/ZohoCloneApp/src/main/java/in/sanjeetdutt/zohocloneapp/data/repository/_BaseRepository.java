package in.sanjeetdutt.zohocloneapp.data.repository;

import in.sanjeetdutt.zohocloneapp.data.model._BaseModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface _BaseRepository<T extends _BaseModel> extends JpaRepository<T, UUID> {
}
