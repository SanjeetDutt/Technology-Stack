package in.sanjeetdutt.recursion;

public class APowerN {

    // Simple way
    long method1(int a, int n){
        if (n == 1)
            return (long) a;

        return method1(a,n-1) * (long) a;
    }

    // Fast power
    long method2(int a , int n) {
        if( n == 1)
            return a;

        long halfPower = method2(a, n/2);

        if(n % 2 == 0 )
            return halfPower * halfPower;
        else
            return halfPower * halfPower * a;
    }
}
