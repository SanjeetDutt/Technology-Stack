package in.sanjeetdutt.string;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SortCharTest {

    @Test
    void sort() {

        SortChar sortChar = new SortChar();

        assertEquals(sortChar.sort("asdfgs"),"adfgss");
    }
}
