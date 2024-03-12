package in.sanjeetdutt.Hashing;

import java.util.HashMap;
import java.util.Map;

/**
 * Given an array and find j-i where A[i]==A[j] and j>i and j-i is minimum
 */
public class ClosestDuplicate {

    int find(int[] array){

        int ans = array.length;
        Map<Integer,Integer> map= new HashMap<>();

        for(int i = 0 ; i < array.length; i++){
            int val = array[i];
            if(map.containsKey(val)){
                int gap = i - map.get(val);
                ans = Integer.min(ans, gap);
            }
            map.put(val,i);
        }

        return ans;
    }
}

/**
 * TC = O(N)
 * SC = O(N)
 */
