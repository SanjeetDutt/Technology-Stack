package in.sanjeetdutt.heaps;

import java.util.PriorityQueue;

/*
You are given an array A of integers that represent the lengths of ropes.

You need to connect these ropes into one rope. The cost of joining two ropes equals the sum of their lengths.

Find and return the minimum cost to connect these ropes into one rope.

Example
A = [5, 17, 100, 11]

Answer
 Given array A = [5, 17, 100, 11].
 Connect the ropes in the following manner:
 5 + 11 = 16
 16 + 17 = 33
 33 + 100 = 133

 So, total cost  to connect the ropes into one is 16 + 33 + 133 = 182.
 */
public class JoinRopes {

    public int solve(int[] A) {
        int totalCost = 0;

        PriorityQueue<Integer> ropes = new PriorityQueue<>();

        // Insert all elements in the queue
        for(int rope : A){
            ropes.add(rope);
        }

        // Join two smallest ropes
        while (ropes.size() > 1){
            int ropeA = ropes.poll();
            int ropeB = ropes.poll();

            int joinedRope = ropeA + ropeB;

            totalCost = totalCost + joinedRope;
            ropes.add(joinedRope);
        }



        return totalCost;
    }
}
