package in.sanjeetdutt.bookmyshow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Region extends BaseModel{
    String name;

    @OneToMany
    List<Theater> theaters;
}
