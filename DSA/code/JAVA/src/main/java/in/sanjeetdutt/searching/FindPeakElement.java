package in.sanjeetdutt.searching;

//Given an increasing and decreasing array with distinct elements. Find the peak element

// Idea 1 : sort the array
// Idea 2 : binary search
public class FindPeakElement {
    int find(int[] array){

        int start = 0;
        int end = array.length -1;

        if(array.length == 1) return array[0];

        while (start <= end){
            // get the mid element
            int mid = start + (end - start) / 2;
            int el = array[mid];

            if(mid == 0){
                // at left corner
                int right = array[mid + 1];

                if(right < el)
                    return el;
                else
                    start = mid + 1;

            } else if(mid == array.length - 1){
                // at right corner
                int left = array[mid - 1];

                if(left < el)
                    return el;
                else
                    end = mid - 1;

            } else {
                // somewhere at middle
                int left = array[mid - 1];
                int right = array[mid + 1];

                if(el > left && el > right) return el;

                if(el < left){
                    // go left
                    end = mid - 1;
                } else {
                    // go right
                    start = mid + 1;
                }

            }

        }

        return -1;
    }
}
