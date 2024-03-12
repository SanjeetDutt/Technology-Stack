package in.sanjeetdutt.sorting;

// Nobel integer = count of elements smaller than A[i] = value of A[i]

import java.util.Arrays;

public class CountNobelInteger {

    //[1 -5 3 5 -10 4]
    // sort => [-10 -5 1 3 4 5]
    //         [ 0   1 2 3 4 5]
    int count (int[] array){
        int count = 0;

        Arrays.sort(array);

        for (int i = 0; i < array.length; i++) {
            if(i == array[i])
                count++;
        }

        return count;

    }
}
