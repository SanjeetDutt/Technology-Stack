package in.sanjeetdutt.array;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MaxSubArraySumOfFixedLengthTest {
    @Test
    void test(){

        MaxSubArraySumOfFixedLength maxSubArraySumOfFixedLength = new MaxSubArraySumOfFixedLength();

        Assertions.assertEquals(
                maxSubArraySumOfFixedLength.maxSum(new int[]{-3,4,-2,5,3,-2,8,2,-1,4},5),
                16
        );
    }
}
