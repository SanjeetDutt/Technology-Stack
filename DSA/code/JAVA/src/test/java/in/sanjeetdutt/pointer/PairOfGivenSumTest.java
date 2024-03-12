package in.sanjeetdutt.pointer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PairOfGivenSumTest {

    @Test
    void solve() {
        PairOfGivenSum pairOfGivenSum = new PairOfGivenSum();

        assertEquals(pairOfGivenSum.solve(new int[]{1,2,6,6,7,9,9}, 13), 2);
    }
}
