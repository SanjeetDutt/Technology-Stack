package in.sanjeetdutt.array;

/**
 * Find maximum sum of all possible sub-array
 * array =      10 -20 7  8 -1 2 (N=6)
 * Total sub array = N * N+1 / 2 = 21
 * BF: Get all sub array and take max of sum of sub array => TC: O(N^3)
 * KADAN'S ALGO
 * Make sum variable and an answer variable. Sum will store the cumulative sum of the no. and answer will have max of cumulative sum.
 * *** If sum < 0, then sum = 0 for next loop <== IMPORTANT POINT IN KANAN's Algo
 * --------------------------
 * number   | sum   | answer
 * --------------------------
 * 10       | 10    | 10
 * -20      | -10=0 | 10 <== KADAN'S ALGO
 * 7        | 7     | 7
 * 8        | 15    | 15
 * -1       | 14    | 15
 * 2        | 16    | 16
 */
public class MaxSumOfSubArray {

    int find(int[] array){

        if(array.length == 0)
            return -1;

        int sum = array[0];
        int answer = array[0];

        if(sum < 0) sum = 0;

        for(int i = 1; i<array.length; i++){
            sum += array[i];
            answer = Integer.max(sum, answer);

            if(sum < 0)
                sum = 0;
        }

        return answer;

    }
}
