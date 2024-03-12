package in.sanjeetdutt.recursion;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class APowerNTest {
    APowerN aPowerN = new APowerN();

    @Test
    void method1() {
        assertEquals(aPowerN.method1(2,2),4L);
        assertEquals(aPowerN.method1(3,3),27L);
        assertEquals(aPowerN.method1(4,4),256L);
    }

    @Test
    void method2() {
        assertEquals(aPowerN.method2(2,2),4L);
        assertEquals(aPowerN.method2(3,3),27L);
        assertEquals(aPowerN.method2(4,4),256L);
    }
}
