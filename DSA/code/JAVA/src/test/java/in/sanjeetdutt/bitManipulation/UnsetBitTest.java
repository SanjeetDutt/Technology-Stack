package in.sanjeetdutt.bitManipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UnsetBitTest {

    @Test
    void unset() {

        UnsetBit unsetBit = new UnsetBit();

        assertEquals(unsetBit.unset(45, 2), 41);
    }
}
