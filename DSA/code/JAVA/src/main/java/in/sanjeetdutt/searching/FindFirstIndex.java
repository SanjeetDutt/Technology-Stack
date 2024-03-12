package in.sanjeetdutt.searching;

public class FindFirstIndex {

    int find(int[] array, int toFind){
        int start = 0;
        int end = array.length-1;
        int lastOccurrence = array.length;

        while (start <= end){
            int mid = start + (end - start) / 2;

            if(array[mid] == toFind){
                // found the element but can be more element on left
                if(mid < lastOccurrence)
                    lastOccurrence = mid;

                end = mid - 1;
            } else if(array[mid] > toFind){
                // Element will be on left
                end = mid - 1;
            } else {
                // Element will be on right
                start = mid + 1;
            }
        }

        if(lastOccurrence == array.length) return -1;

        return lastOccurrence;
    }
}
