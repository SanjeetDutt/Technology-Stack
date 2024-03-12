package in.sanjeetdutt.sorting.selectionAndMergeSort;

public class MergeSort {

    int[] sort(int[] array){
        sort(array, 0 , array.length-1);
        return array;
    }

    private void sort(int[] array, int s, int e){

        if(s == e) return;

        int m = s + (e-s)/2;

        sort(array, s, m);
        sort(array, m+1, e);

        merge(array, s, m, e);
    }

    // Duplicating code from Sort sorted sub-array
    private void merge(int[] array, int s, int m, int e){
        int[] result = new int[e-s+1];

        int pointerA = s;
        int pointerB = m+1;
        int pointerR = 0;

        while (pointerA < m+1 && pointerB < e+1){
            if(array[pointerA] < array[pointerB]){
                result[pointerR] = array[pointerA];
                pointerA++;
                pointerR++;
            } else {
                result[pointerR] = array[pointerB];
                pointerB++;
                pointerR++;
            }
        }

        while (pointerA < m+1){
            result[pointerR] = array[pointerA];
            pointerA++;
            pointerR++;
        }

        while (pointerB < e+1){
            result[pointerR] = array[pointerB];
            pointerB++;
            pointerR++;
        }

        for(int i = s; i <= e; i++){
            array[i] = result[i-s];
        }
    }
}
