package in.sanjeetdutt.array;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CountEquilibriumIndexTest {

    @Test
    void test(){
        CountEquilibriumIndex countEquilibriumIndex = new CountEquilibriumIndex();
        Assertions.assertEquals(
                countEquilibriumIndex.countEquilibriumIndex(new int[]{-7,1,5,2,-4,3,0}),
                2
        );
    }

}
