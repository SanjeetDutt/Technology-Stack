package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Theater extends BaseModel {
    String name;

    @ManyToOne
    Region region;

    /*
    Theater Screen
    1       M
    1       1
    ----------
    1:M
     */
    @OneToMany
    List<Screen> screens;


}
