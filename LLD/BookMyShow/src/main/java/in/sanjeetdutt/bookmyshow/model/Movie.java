package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Movie extends BaseModel {

    String name;

    /*
    MOVIE   CAST
    1       M
    M       1
    -------------
    M:M
     */
    @ManyToMany
    Set<Cast> casts;
    Double duration;

}
