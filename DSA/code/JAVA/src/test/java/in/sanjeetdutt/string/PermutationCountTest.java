package in.sanjeetdutt.string;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PermutationCountTest {

    @Test
    void count() {
        PermutationCount permutationCount = new PermutationCount();

        assertEquals(permutationCount.count("XYZ","XYZXY"), 3);
        assertEquals(permutationCount.count("ABCA","ABCAACBBCCBACA"), 4);

    }

}
