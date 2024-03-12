package in.sanjeetdutt.searching;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FindPeakElementTest {

    @Test
    void find() {

        FindPeakElement findPeakElement = new FindPeakElement();

        assertEquals(findPeakElement.find(new int[]{1,3,5,2}), 5);
        assertEquals(findPeakElement.find(new int[]{1,3,5,10,15,12,6}), 15);
        assertEquals(findPeakElement.find(new int[]{5}), 5);
        assertEquals(findPeakElement.find(new int[]{1,2,6,10}), 10);
        assertEquals(findPeakElement.find(new int[]{10,6,2,1}), 10);
    }
}
