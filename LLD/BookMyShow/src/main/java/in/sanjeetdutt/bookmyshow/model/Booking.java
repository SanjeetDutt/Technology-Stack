package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking extends BaseModel {
    /*
    Booking User
    1       1
    M       1
    -------------
    M:1
     */
    @ManyToOne
    User user;

    @OneToOne
    Show show;

    /*
    Booking Seat
    1       M
    M       1
    ----------
    M:M
     */
    @ManyToMany
    List<Seat> seat;

    /*
    Booking Payment
    1       M
    1       1
    --------------
    1:M
     */
    @OneToMany
    Set<Payment> payment;
}
