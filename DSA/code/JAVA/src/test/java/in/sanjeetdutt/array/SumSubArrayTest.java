package in.sanjeetdutt.array;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SumSubArrayTest {

    @Test
    void test(){
        SumSubArray sumSubArray = new SumSubArray();

        Assertions.assertEquals(
                sumSubArray.sum(new int[]{-1,3,4}),
                21
        );

        Assertions.assertEquals(
                sumSubArray.sum(new int[]{4,-1,2,3}),
                34
        );
    }

}
