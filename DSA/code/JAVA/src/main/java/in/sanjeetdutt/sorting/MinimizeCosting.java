package in.sanjeetdutt.sorting;

// Given an array, and we need to delete all the element in array.
// Cost = Sum of all elements before delete.
// Minimize the costing

// Trick delete the larger element First

import java.util.Arrays;

public class MinimizeCosting {

    int solve(int[] array){

        Arrays.sort(array);

        int sum = 0;

        for (int i : array){
            sum += i;
        }

        int cost = 0;

        for (int i = array.length-1; i >= 0 ; i--) {
            cost += sum;

            sum -= array[i];
        }

        return cost;
    }
}
