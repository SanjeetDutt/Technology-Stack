package in.sanjeetdutt.sorting.selectionAndMergeSort;

// Give an int array A. Count for all i < j, A[i] > A[j}
public class InversionCount {
    int count = 0;
    int mod = 100000000 + 7;

    int count(int[] A){
        count = 0;
        mergeSort(A, 0, A.length-1);
        return count;
    }

    void mergeSort (int[] array, int start, int end){

        if(start == end) return;

        int mid = start + (end-start)/2;
        // s1: 3

        mergeSort(array, start, mid);
        mergeSort(array, mid+1, end);

        merge(array, start, mid, end);

    }

    void merge (int[] array, int start, int mid, int end){
        int[] result = new int[end - start + 1];

        int pointerA = start;
        int pointerB = mid + 1;
        int pointerR = 0;

        while (pointerA <=mid && pointerB <= end){
            // pointerA is always smaller that pointerB

            if(array[pointerA] > array[pointerB]){
                // found inversion pairs
                result[pointerR] = array[pointerB];
                incrementCount(pointerB - mid);
                System.out.println("Increment by " + (pointerB - mid) + " pointer A : " + pointerA + " pointer B : " + pointerB);

                pointerB++;
                pointerR++;
            } else {
                result[pointerR] = array[pointerA];

                pointerA++;
                pointerR++;
            }
        }

        while(pointerA <= mid){
            //found inversion pairs
            result[pointerR] = array[pointerA];
            incrementCount(pointerB - 1 - mid);
            System.out.println("Increment by " + (pointerB - mid) + " pointer A : " + pointerA + " pointer B : " + (pointerB-1));


            pointerA++;
            pointerR++;
        }

        while (pointerB <= end){
            result[pointerR] = array[pointerB];
            pointerR++;
            pointerB++;
        }


        for(int i = start; i <=end; i++){
            array[i] = result[i - start];
        }
    }

    void incrementCount (int by){
        count = (count + by % mod) % mod;
    }

}
