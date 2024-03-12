package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FindPairSumTest {

    FindPairSum findPairSum = new FindPairSum();

    @Test
    void solveByHashTable() {

        assertTrue(findPairSum.solveByHashTable(new int[]{8,9,1,-2,4,5,11,-6,7,5},11));
        assertFalse(findPairSum.solveByHashTable(new int[]{8,9,1,-2,4,5,11,-6,7,5},22));

    }

    @Test
    void solveByHashSet() {
        assertTrue(findPairSum.solveByHashTable(new int[]{8,9,1,-2,4,5,11,-6,7,5},11));
        assertFalse(findPairSum.solveByHashTable(new int[]{8,9,1,-2,4,5,11,-6,7,5},22));
    }
}
