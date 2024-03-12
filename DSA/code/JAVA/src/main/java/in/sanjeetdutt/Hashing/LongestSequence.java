package in.sanjeetdutt.Hashing;

import java.util.HashSet;

/**
 * Given an array, and find the longest sequence of consecutive elements
 * EX- 100 4 2 6 10 20 11 5 101
 * 100 101
 * 3 4 5 6 => 4
 * 10 11
 * 20
 */
public class LongestSequence {
    int find(int[] array){
        int ans = 0;

        //Create a hashset
        HashSet<Integer> set = new HashSet<>();

        //Append all the values
        for(int no : array)
            set.add(no);

        // For each value in the hashset
        for(int no : set){

            if(set.contains(no-1))
                continue;

            int n = no;
            int count = 0;

            // get all the consecutive numbers
            while (set.contains(n)){
                n++;
                count++;
            }

            // max of it will be our answer
            ans = Integer.max(ans, count);
        }

        return ans;
    }
}
/**
 * TC = O(N)
 * SC = O(N)
 */
