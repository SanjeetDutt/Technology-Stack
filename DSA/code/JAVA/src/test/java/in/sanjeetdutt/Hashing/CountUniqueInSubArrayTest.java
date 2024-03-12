package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CountUniqueInSubArrayTest {

    @Test
    void solve() {
        CountUniqueInSubArray countUniqueInSubArray = new CountUniqueInSubArray();

        assertEquals(countUniqueInSubArray.solve(new int[]{2,4,3,8,3,9,4,9,4,10},4),22);
    }
}
