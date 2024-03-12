package in.sanjeetdutt.sorting.selectionAndMergeSort;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InversionCountTest {

    @Test
    void count() {
        InversionCount inversionCount = new InversionCount();

        assertEquals(inversionCount.count(new int[]{4,5,1,2,6,3}), 7);
        assertEquals(inversionCount.count(new int[]{1,3,2}), 1);
        assertEquals(inversionCount.count(new int[]{3,4,1,2}), 4);
        assertEquals(inversionCount.count(new int[]{10,38,15,6,12,2,18,7,1}), 14);
    }
}
