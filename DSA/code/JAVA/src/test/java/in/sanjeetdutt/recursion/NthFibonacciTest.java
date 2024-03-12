package in.sanjeetdutt.recursion;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NthFibonacciTest {

    NthFibonacci nthFibonacci = new NthFibonacci();

    @Test
    void fib() {

        assertEquals(nthFibonacci.fib(2),1);
        assertEquals(nthFibonacci.fib(3),2);
        assertEquals(nthFibonacci.fib(4),3);
        assertEquals(nthFibonacci.fib(5),5);
    }
}
