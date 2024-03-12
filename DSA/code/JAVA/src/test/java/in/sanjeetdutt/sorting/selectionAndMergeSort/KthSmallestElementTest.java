package in.sanjeetdutt.sorting.selectionAndMergeSort;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class KthSmallestElementTest {

    @Test
    void find() {

        KthSmallestElement kthSmallestElement = new KthSmallestElement();

        assertEquals(kthSmallestElement.find(new int[]{2,1,4,3,2}, 3), 2);

        assertEquals(kthSmallestElement.find(new int[]{1,2}, 2), 2);
    }
}
