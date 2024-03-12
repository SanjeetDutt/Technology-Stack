package in.sanjeetdutt.array;

/**
 * Given array = -3 4 -2 5 3 -2 8 2 -1 4
 * find max sum when sub array length = k
 * *
 * Brute force : get all sub-array and find max sum tc n^3 sc 1
 * prefix array : tc n sc n
 * *
 * fixed width and carry forward = sliding window
 */
public class MaxSubArraySumOfFixedLength {

    int maxSum (int[] arr, int k)
    {
        int windowSum = 0;

        for(int i = 0 ; i < k; i++)
        {
            windowSum+= arr[i];
        }

        int maxSum = windowSum;
        int start = 1;
        int end = k;

        while(end<arr.length)
        {
            windowSum = windowSum - arr[start-1] + arr[end];

            if(windowSum > maxSum)
                maxSum = windowSum;

            start++;
            end++;
        }

        return maxSum;
    }
}
