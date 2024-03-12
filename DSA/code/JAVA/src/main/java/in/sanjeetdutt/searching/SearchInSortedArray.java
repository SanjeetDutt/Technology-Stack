package in.sanjeetdutt.searching;

// Given a sorted array and find the index of the element
public class SearchInSortedArray {
    // Idea 1: Linear search : TC = O(N)
    // Idea 2: Binary search
    int search(int[] array, int toFind){
        int start = 0;
        int end = array.length - 1;

        while (start <= end){
            int mid = start + (end - start) / 2;

            if(array[mid] == toFind) return mid;

            if(array[mid] > toFind){
                // Element to find will be located at left
                end = mid - 1;
            } else {
                // Otherwise, on right
                start = mid + 1;
            }
        }

        return -1;
    }
}
