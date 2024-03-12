package in.sanjeetdutt.searching;

//Given an unsorted array, find the local minima.(Given array will have at least 3 element)
//local minima means el < LHS & RHS
public class LocalMinima {

    //[9,8,7,3,6,4,1,5,2] => 3,1,2 are the local minima
    int find (int[] array){
        int start = 0;
        int end = array.length-1;

        while(start <= end){
            int mid = start + (end - start)/2;

            //checking is local minima
            if(array[mid] < array[mid-1] && array[mid] < array[mid+1])
                return array[mid];

            // if LHS > mid, move right
            if(array[mid-1] > array[mid]){
                start = mid+1;
            }

            // if RHS > mid, move left
            if(array[mid+1] > array[mid]){
                end = mid -1;
            }
        }

        return -1;
    }
}
