package in.sanjeetdutt.tries;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ByteTriesTest {

    @Test
    void maxXOR() {
        ByteTries byteTries = new ByteTries();

        int[] array = new int[]{9,8,7,10};
        int result = byteTries.maxXOR(array);

        assertEquals(result, 0);
    }
}
