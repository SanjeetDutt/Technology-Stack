package in.sanjeetdutt.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MinimizeCostingTest {

    @Test
    void solve() {

        MinimizeCosting minimizeCosting = new MinimizeCosting();

        assertEquals(minimizeCosting.solve(new int[]{2,1,4}),11);

    }
}
