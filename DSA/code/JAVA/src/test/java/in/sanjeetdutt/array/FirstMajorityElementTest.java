package in.sanjeetdutt.array;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FirstMajorityElementTest {

    @Test
    void findMajorityElement() {

        FirstMajorityElement firstMajorityElement = new FirstMajorityElement();
        int[] array = new int[]{1,2,3,4};
        assertEquals(firstMajorityElement.findMajorityElement(array), -1);

        array = new int[]{1,2,2,4};
        assertEquals(firstMajorityElement.findMajorityElement(array), 2);
    }
}
