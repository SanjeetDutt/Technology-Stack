package in.sanjeetdutt.array;

/**
 * Given an array and rotate it k times
 * Given [1 2 3 4 5 6]
 * 1st rotation = [2 3 4 5 6 1]
 * 2nd rotation = [3 4 5 6 1 2]
 *
 * Brute force :
 * shift all elements to right and put first el in last spot, and repeat it K-time
 * TC=O(KN)
 *
 * Better way
 * Put array from K to N-1 in a new array and then put array from 0 to K-1
 * TC=O(N) SC=O(N) <== Time complexity cannot improve by space can
 *
 * 3rd rotation = [1 2 3 4 5 6] => [6 5 4 3 2 1] => [4 5 6 1 2 3]
 * => Reverse whole array, then reverse 0 to K-1 and then K to N-1
 * TC=O(N) SC = O(1)
 *
 * if K > N =K%N
 */


public class RotateArray {

    int[] rotateArray(int[] arr, int k){
        int N = arr.length;

        if(k > N){
            return rotateArray(arr, k%N);
        }

        rotate(arr, 0, N-1);
        rotate(arr, 0, N-k-1);
        rotate(arr, N-k, N-1);

        return arr;
    }

    private void rotate(int[] arr, int start, int end) {
        while(start < end){
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
}
