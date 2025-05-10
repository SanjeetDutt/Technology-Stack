package in.sanjeetdutt.greedy;

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.TreeMap;

/**
 * There is a limited time sale going on for the toys
 * - A[i] => Sale end time for ith toy
 * - B[i] => Beauty of ith toy
 * - Time start with T=0 and it take 1 unit of time to but one time & toy can be bought if T < A[i]
 * - Buy toys such that sum of the beauty of toy is maximised
 */

public class BuyToys {



    public int buyMaximisedToys(int[] time, int[] beauty) {

        // Sort the time and beauty array based on the time asc
        Map<Integer, Integer> timeBeautyMap = new TreeMap<>();
        for(int i = 0; i < time.length; i++){
            timeBeautyMap.put(time[i], i);
        }

        // loop over the array and add do following
        // If time < time[i], then and the element in the heep array and increment the time counter
        // Else, check for any element in the heep array can be replaced, if so then replace it.
        int timeCounter = 0;
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for(Integer currentTime : timeBeautyMap.keySet()){
            if(timeCounter < currentTime){
                minHeap.add(timeBeautyMap.get(currentTime));

            } else {

            }
        }


        // final answer will be sum of all element in the heep array.

        //Return the final answer
        return 0;
    }
}
