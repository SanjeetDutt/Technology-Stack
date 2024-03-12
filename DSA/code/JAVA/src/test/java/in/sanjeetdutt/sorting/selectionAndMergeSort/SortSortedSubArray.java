package in.sanjeetdutt.sorting.selectionAndMergeSort;

/**
 * Given an array and 3 indices s, m, and e. And it known that subarray [s,m] is sorted and subarray [m+1, e] is sorted. Sort the sub array [s,e]
 */
public class SortSortedSubArray {

    // s,m,e are 0-based indices
    int[] sortSortedSubArray(int[] array, int s, int m,int e ){

        // 4,8,[-1,2,6,9,11],[3,4,7],13,0

        // Sorting cannot be done on the same array
        // create a new array and replace it later in the sub array

        int[] subArray = new int[e-s+1];
        int pointer1 = s;
        int pointer2 = m+1;
        int pointerR = 0;

        while(pointer1 < m+1 && pointer2 < e+1){
            if(array[pointer1] < array[pointer2]){
                subArray[pointerR] = array[pointer1];
                pointer1++;
                pointerR++;
            } else {
                subArray[pointerR] = array[pointer2];
                pointer2++;
                pointerR++;
            }
        }

        while(pointer1 < m+1 ){
            subArray[pointerR] = array[pointer1];
            pointer1++;
            pointerR++;
        }

        while(pointer2 < e+1){
            subArray[pointerR] = array[pointer2];
            pointer2++;
            pointerR++;
        }

        for(int i = s; i <= e; i++){
            array[i] = subArray[i-s];
        }

        return array;
    }
}
