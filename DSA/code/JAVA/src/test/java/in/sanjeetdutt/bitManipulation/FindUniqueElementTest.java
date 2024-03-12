package in.sanjeetdutt.bitManipulation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FindUniqueElementTest {

    @Test
    void find() {
        FindUniqueElement findUniqueElement = new FindUniqueElement();
        assertEquals(findUniqueElement.find(new int[]{1,2,3,4,1,2,3}), 4);
    }
}
