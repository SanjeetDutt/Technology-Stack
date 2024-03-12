package in.sanjeetdutt.sorting.selectionAndMergeSort;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MergeSortedArrayTest {

    @Test
    void merge() {
        MergeSortedArray mergeSortedArray = new MergeSortedArray();

        assertArrayEquals(mergeSortedArray.merge(new int[]{4,7,9,100}, new int[]{2,11,19}), new int[]{2,4,7,9,11,19,100});

        assertArrayEquals(mergeSortedArray.merge(new int[]{1}, new int[]{2}), new int[]{1,2});

        assertArrayEquals(mergeSortedArray.merge(new int[]{4,7,9}, new int[]{2,11,19,100}), new int[]{2,4,7,9,11,19,100});


    }
}
