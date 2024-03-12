package in.sanjeetdutt.array;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MaxSumOfSubArrayTest {

    MaxSumOfSubArray maxSumOfSubArray = new MaxSumOfSubArray();

    @Test
    void find() {
        assertEquals(maxSumOfSubArray.find(new int[]{}),-1);
        assertEquals(maxSumOfSubArray.find(new int[]{10,-20,7,8,-1,2}),16);
    }
}
