package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ClosestDuplicateTest {

    @Test
    void find() {
        ClosestDuplicate closestDuplicate = new ClosestDuplicate();
        assertEquals(closestDuplicate.find(new int[]{2,4,5,6,-1,2,5,4,3,7,3,2}),2);
    }
}
