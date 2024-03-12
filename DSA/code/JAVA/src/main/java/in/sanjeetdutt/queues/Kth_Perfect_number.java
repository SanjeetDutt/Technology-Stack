package in.sanjeetdutt.queues;

import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * Generate kth perfect number in series using only 1 and 2 as digits.
 * SERIES SHOULD BE INCREASING NUMBER
 * k = 5 => 1 2 11 12 [21]
 * k = 7 => 1 2 11 12 21 22 [111]
 */

/*
OBSERVATION:
Make a queue 11 and 12 is made by adding 1 and 2 at end of 1.
Similarly, 21 and 22 is made by adding 1 and 2 ate end of 2

Approach
make a queue and add 1 and 2 in it.
loop over the queue elements for k times and do:
    access the element as e
    if i == k, return the e
    else add in queue following 2 values
        e * 10 + 1
        e * 10 + 2

 */
public class Kth_Perfect_number {

    int findPerfectNumber(int k){

        Queue<Integer> numberQueue = new LinkedList<>();

        // Adding default values
        numberQueue.add(1);
        numberQueue.add(2);

        int i = 1;

        while (i <= k){
            int e = numberQueue.poll();
            if(i == k){
                return e;
            } else {
                numberQueue.add( (e * 10) + 1);
                numberQueue.add( (e * 10) + 2);
            }

            i++;
        }

        return -1;
    }
}
