package in.sanjeetdutt.searching;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FindFirstIndexTest {

    @Test
    void find() {
        FindFirstIndex findFirstIndex = new FindFirstIndex();

        int[] array = new int[]{-5,-5,-3,0,0,1,1,5,5,5,5,5,5,5,8,10,10,15,16};

        assertEquals(findFirstIndex.find(array, 5), 7);
        assertEquals(findFirstIndex.find(array, -5), 0);
        assertEquals(findFirstIndex.find(array, 16), 18);
        assertEquals(findFirstIndex.find(array, 20), -1);

    }
}
