package in.sanjeetdutt.zohocloneapp.data.model.user;

import in.sanjeetdutt.zohocloneapp.data.model._BaseModel;
import in.sanjeetdutt.zohocloneapp.main.configuration.BasicConfig;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Password extends _BaseModel {

    private String password;
    private LocalDateTime expireAt;

    @ManyToOne
    private User user;
}
