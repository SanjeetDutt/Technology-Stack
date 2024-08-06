package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Show extends BaseModel {
    /*
    Show    Movie
    1       1
    M       1
    -----------------
    M:1
     */
    @ManyToOne
    Movie movie;
    Date time;

    /*
    Show    Screen
    1       1
    M       1
    -------------
    M:1
     */
    @ManyToOne
    Screen screen;

}
