package in.sanjeetdutt.queues;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Kth_Perfect_numberTest {

    @Test
    void findPerfectNumber() {

        Kth_Perfect_number kth_perfect_number = new Kth_Perfect_number();

        assertEquals(kth_perfect_number.findPerfectNumber(5), 21);

        assertEquals(kth_perfect_number.findPerfectNumber(7), 111);
    }
}
