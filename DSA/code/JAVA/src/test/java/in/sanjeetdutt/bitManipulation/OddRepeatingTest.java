package in.sanjeetdutt.bitManipulation;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OddRepeatingTest {

    @Test
    void solve() {
        OddRepeating oddRepeating = new OddRepeating();

        Assertions.assertEquals(oddRepeating.solve(new int[]{5,7,5,9,7,11,11,7,5,11}), 9);
    }
}
