package in.sanjeetdutt.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DoubleCharTroubleTest {

    @Test
    void testFunction(){
        DoubleCharTrouble doubleCharTrouble = new DoubleCharTrouble();

        assertEquals(doubleCharTrouble.solve("abba"),"");
    }

}
