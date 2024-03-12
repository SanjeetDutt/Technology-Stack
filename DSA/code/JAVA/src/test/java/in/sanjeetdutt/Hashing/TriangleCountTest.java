package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TriangleCountTest {

    @Test
    void count() {

        TriangleCount triangleCount = new TriangleCount();

        assertEquals(triangleCount.count(new int[]{1,1,2}, new int[]{1,2,1}),1);
        assertEquals(triangleCount.count(new int[]{1,1,2,3,3}, new int[]{1,2,1,2,1}),6);

    }
}
