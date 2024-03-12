package in.sanjeetdutt.array;

/**
 * Find sum of all possible sub array
 *
 * brute force: find all possible sub and sum it tc: n^3 sc=1 or tc=n^2 sc=n
 *
 * contribution technique: el val * number of appearance in sum tc=n, sc=1
 */
public class SumSubArray {
    int sum(int[] arr){

        int sum = 0;
        int N = arr.length;

        for(int i=0; i<N; i++ ){
            sum += arr[i] * ((i+1)*(N-i));
        }

        return sum;

    }
}
