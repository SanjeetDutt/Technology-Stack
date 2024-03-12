package in.sanjeetdutt.searching;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SearchInSortedArrayTest {

    @Test
    void search() {
        SearchInSortedArray searchInSortedArray = new SearchInSortedArray();

        assertEquals(
                searchInSortedArray.search(new int[]{3,6,9,12,14,19,20,23,25,27},12),
                3
        );

        assertEquals(
                searchInSortedArray.search(new int[]{3,6,9,12,14,19,20,23,25,27},0),
                -1
        );
    }
}
