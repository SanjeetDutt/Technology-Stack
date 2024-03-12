package in.sanjeetdutt.sorting.selectionAndMergeSort;

/**
 * Given an array and find the kth smallest element in the array by using selection sort technique.
 * Brute force: Sort the whole array and return array[k-1] <== selection sort technique not used
 *
 */

public class KthSmallestElement {

    int find(final int[] array, int k){

        // Loop k times
        for(int i = 0 ; i < k; i++){
            // Iterate over the array from i to N-1 and find the small element
            int smallestNumber = array[i];
            int smallestNumberPosition = i;

            for(int j = i; j < array.length; j++){
                if(array[j] < smallestNumber){
                    smallestNumber = array[j];
                    smallestNumberPosition = j;
                }
            }

            // replace smallest number with the ith term
            if(smallestNumberPosition != i){
                int temp = array[i];
                array[i] = array[smallestNumberPosition];
                array[smallestNumberPosition] = temp;
            }
        }

        return array[k-1];
    }
}
/**
 * Time complxity = O(N*K)
 * space = O(1)
 */
