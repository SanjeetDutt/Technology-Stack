package in.sanjeetdutt.sorting.selectionAndMergeSort;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MergeSortTest {

    @Test
    void sort() {

        MergeSort mergeSort = new MergeSort();

        assertArrayEquals(mergeSort.sort(new int[]{9,8,7,6,5,4,3,2,1,0}), new int[]{0,1,2,3,4,5,6,7,8,9});
    }
}
