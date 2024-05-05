package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cast extends BaseModel {

    String name;

    /*
    CAST    MOVIE
    1       M
    M       1
    ---------------
    M:M
     */
    @ManyToMany
    List<Movie> movies;
}
