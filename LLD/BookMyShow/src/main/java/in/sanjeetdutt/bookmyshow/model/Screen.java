package in.sanjeetdutt.bookmyshow.model;

import in.sanjeetdutt.bookmyshow.enums.Feature;
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
public class Screen extends BaseModel {

    String name;

    /*
    SCREEN      THEATER
    1           1
    M           1
    -----------------------
    M : 1
     */
    @ManyToOne
    Theater theater;

    /*
    SCREEN  FEATURE
    1       M
    M       1
    --------------------
    M:M
     */
    @ElementCollection(targetClass = Feature.class)
    @CollectionTable(
            name = "screen_features",
            joinColumns = @JoinColumn(name = "feature_id")
    )
    @Enumerated(EnumType.STRING)
    Set<Feature> features;

    /*
    SCREEN  SEAT
    1       M
    1       1
    ------------
    1 : M
     */
    @OneToMany
    List<Seat> seats;
}
