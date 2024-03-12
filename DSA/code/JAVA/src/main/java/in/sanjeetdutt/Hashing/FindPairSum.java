package in.sanjeetdutt.Hashing;

// Given an array and int K.
// Find if exist A[i] + A[j] == K && i!=j

// [8,9,1,-2,4,5,11,-6,7,5] K = 11

// BF for(i = 0 to N-1) and for(j=i+1 to N-1) if A[i] + A[j] == K return true <==  TC=O(N^2), SC=O(1)

// Hash table => key = el's val and value = frequency, loop though the keys and try to pair values

// Hash set =>

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class FindPairSum {

    boolean solveByHashTable(int[] array, int k){
        Map<Integer, Integer> frequencyMap = new HashMap<>();

        for(int i : array){
            int frequency = frequencyMap.getOrDefault(i,0);
            frequency++;
            frequencyMap.put(i, frequency);
        }

        for(int key : frequencyMap.keySet()){

            if(2*key == k){
                if(frequencyMap.get(key) > 1)
                    return true;
            } else {
                int b = k - key;
                if(frequencyMap.containsKey(b))
                    return true;
            }

        }

        return false;
    }

    boolean solveByHashSet(int[] array, int k){
        Set<Integer> uniqueValue = new HashSet<>();

        for(int i : array){
            int b = k-i;

            if(uniqueValue.contains(b))
                return true;

            uniqueValue.add(i);
        }

        return false;
    }
}
