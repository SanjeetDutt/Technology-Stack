package in.sanjeetdutt.zohocloneapp.data.model.user;

import in.sanjeetdutt.zohocloneapp.data.model._BaseModel;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends _BaseModel {

    private String firstName;
    private String lastName;
    private String email;

    //User  : password
    //1     : M
    //1     : 1
    @OneToMany(mappedBy = "user")
    private List<Password> password;

    @ElementCollection(targetClass = Authority.class)
    @Enumerated(EnumType.STRING)
    private List<Authority> authorities;

    //======================================
    public void addPassword(Password password) {
        if(this.password == null){
            this.password = new ArrayList<Password>();
        }
        this.password.add(password);
    }

    public Optional<Password> getActivePassword(){
        if(this.password == null){
            return Optional.empty();
        }

        for(Password password : this.password){
            if(password.getExpireAt().isAfter(LocalDateTime.now())){
                return Optional.of(password);
            }
        }

        return Optional.empty();
    }
}
