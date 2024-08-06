package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class User extends BaseModel{

    String name;
    String email;

    /*
    User    Booking
    1       M
    1       1
    --------------------
    1:M
     */
    @OneToMany
    Set<Booking> bookings;
}
