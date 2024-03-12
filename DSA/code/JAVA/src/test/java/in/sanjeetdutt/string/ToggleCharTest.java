package in.sanjeetdutt.string;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ToggleCharTest {

    @Test
    void toggle() {
        ToggleChar toggleChar = new ToggleChar();

        assertEquals(toggleChar.toggle("AnaConDa"),"aNAcONdA");
    }
}
