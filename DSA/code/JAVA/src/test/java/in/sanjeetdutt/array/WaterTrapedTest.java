package in.sanjeetdutt.array;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WaterTrapedTest {

    WaterTraped waterTraped = new WaterTraped();
    int[] building = new int[]{6,3,2,4,1,3,5,3,4};

    @Test
    void find() {
        assertEquals(waterTraped.find(building),13);
    }

    @Test
    void getMaxHeightOnLeft() {
        assertArrayEquals(waterTraped.getMaxHeightOnLeft(building), new int[]{0,6,6,6,6,6,6,6,6});
    }

    @Test
    void getMaxHeightOnRight() {
        assertArrayEquals(waterTraped.getMaxHeightOnRight(building), new int[]{5,5,5,5,5,5,4,4,0});
    }

    @Test
    void optimizedAnswer() {
        assertEquals(waterTraped.optimizedAnswer(building),13);

        assertEquals(waterTraped.optimizedAnswer(new int[]{3,0,6,3,2,4,1,3,5,3,4}),16);
    }
}
