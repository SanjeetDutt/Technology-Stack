package in.sanjeetdutt.sorting.selectionAndMergeSort;

/**
 * Given 2 sorted array, merge them into 1 sorted array
 */
public class MergeSortedArray {

    int[] merge(int[] A, int[] B){
        int[] result = new int[A.length + B.length];
        int pointerA = 0;
        int pointerB = 0;
        int pointerResult = 0;

        while (pointerA < A.length && pointerB < B.length){

            if(A[pointerA] < B[pointerB]){
                result[pointerResult] = A[pointerA];
                pointerA++;
                pointerResult++;
            } else {
                result[pointerResult] = B[pointerB];
                pointerB++;
                pointerResult++;
            }

        }

        while (pointerA < A.length){
            result[pointerResult] = A[pointerA];
            pointerA++;
            pointerResult++;
        }

        while (pointerB < B.length){
            result[pointerResult] = B[pointerB];
            pointerB++;
            pointerResult++;
        }

        return result;
    }
}
