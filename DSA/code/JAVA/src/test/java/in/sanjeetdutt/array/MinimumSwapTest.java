package in.sanjeetdutt.array;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class MinimumSwapTest {

    @Test
    void test(){

        MinimumSwap minimumSwap = new MinimumSwap();
        Assertions.assertEquals(
                minimumSwap.calculate(new char[]{'B','G','B','G','B','G','B','G','B','G','B','G','B','G','B','B'},4),
                1
        );
    }

}
