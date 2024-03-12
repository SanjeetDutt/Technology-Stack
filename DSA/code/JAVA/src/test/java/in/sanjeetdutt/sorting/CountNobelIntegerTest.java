package in.sanjeetdutt.sorting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CountNobelIntegerTest {

    @Test
    void count() {

        CountNobelInteger nobelInteger = new CountNobelInteger();

        assertEquals(nobelInteger.count(new int[]{1,-5,3,5,-10,4}),3);
    }
}
