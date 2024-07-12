package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Seat extends BaseModel {

    String name;
    int row;
    int col;

    /*
    * SEAT SEAT_TYPE
    * 1     1
    * M     1
    * ----------
    * M     1
    * */
    @ManyToOne
    SeatType seatType;
}
