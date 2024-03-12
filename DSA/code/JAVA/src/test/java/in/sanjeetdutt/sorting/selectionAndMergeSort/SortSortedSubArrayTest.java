package in.sanjeetdutt.sorting.selectionAndMergeSort;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SortSortedSubArrayTest {

    @Test
    void sortSortedSubArray() {
        SortSortedSubArray sortSortedSubArray = new SortSortedSubArray();

        assertArrayEquals(sortSortedSubArray.sortSortedSubArray(new int[]{4,8,-1,2,6,9,11,3,4,7,13,0}, 2,6,9), new int[]{4,8,-1,2,3,4,6,7,9,11,13,0});

    }
}
