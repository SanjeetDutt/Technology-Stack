package in.sanjeetdutt.recursion;

/**
 * Get the Nth Fibonnaci no.
 * 0 1 2 3 4 5 6 7  8  9
 * 0 1 1 2 3 5 8 13 21 34
 *
 * fib(2) => 1 + 0 = Fib(1) + Fib(0)
 * fib(3) = fib(2) + fib(1)
 *
 * fib(N) = fib(N-1) + fib(N-2) <== Main Logic
 *
 * fib(0) = 0 <== Base condition
 * fib(1) = 1 <== Base condition
 */
public class NthFibonacci {

    // Base condition
    int fib(int N){
        if(N == 0) return 0;
        if(N == 1) return 1;

        // Main Logic
        return fib(N-1) + fib(N-2);
    }
}
