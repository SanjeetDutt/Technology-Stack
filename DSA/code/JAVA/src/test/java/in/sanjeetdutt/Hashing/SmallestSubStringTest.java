package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SmallestSubStringTest {

    SmallestSubString smallestSubString = new SmallestSubString();

    @Test
    void find() {
        assertEquals(smallestSubString.find("ABCDBCXYA","CAC"), 6);
        assertEquals(smallestSubString.find("ABACBXABY","CX"), 3);

    }

    @Test
    void compareFrequencyArray() {
        int[] A1 = new int[]{2,3,0,0,5};
        int[] B1 = new int[]{4,6,2,4,9};
        assertTrue(smallestSubString.compareFrequencyArray(A1,B1));

        int[] A2 = new int[]{2,3,0,0,5};
        int[] B2 = new int[]{1,1,1,1,1};
        assertFalse(smallestSubString.compareFrequencyArray(A2,B2));

    }
}
