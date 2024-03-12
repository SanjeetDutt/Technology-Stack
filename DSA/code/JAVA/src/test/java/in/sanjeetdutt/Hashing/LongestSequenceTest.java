package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LongestSequenceTest {

    @Test
    void find() {
        LongestSequence longestSequence = new LongestSequence();

        assertEquals(longestSequence.find(new int[]{100,4,3,6,10,20,11,5,101}), 4);
    }
}
