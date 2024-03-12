package in.sanjeetdutt.Hashing;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ColorfulNumberTest {

    @Test
    void testColorfulNumber() {
        ColorfulNumber colorfulNumber = new ColorfulNumber();
        assertEquals(colorfulNumber.colorful(236), 0);
        assertEquals(colorfulNumber.colorful(23), 1);
        assertEquals(colorfulNumber.colorful(100), 0);
    }
}
