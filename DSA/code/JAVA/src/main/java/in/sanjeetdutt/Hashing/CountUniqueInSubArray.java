package in.sanjeetdutt.Hashing;

import java.util.HashMap;
import java.util.Map;

// Given an array and int K, count total unique elements in all possible sub-array of size k
// BF => loop through all possible sub array of size K and put all the elements in the HashSet and cal the length of it; <== TC O(N^2), SC O(1)
// Sliding window with hash map <== TC O(max(N-K,K)) SC O(K)
public class CountUniqueInSubArray {

    int solve(int[] A, int K){

        Map<Integer,Integer> frequencyMap = new HashMap<>();

        // Made a window
        for(int i = 0 ; i < K; i++){
            add(frequencyMap,A[i]);
        }
        int sum = frequencyMap.size();
        for(int i = K; i< A.length; i++){
            remove(frequencyMap, A[i-K]);
            add(frequencyMap, A[i]);
            sum+=frequencyMap.size();
        }
        return sum;
    }

    void add(Map<Integer,Integer> frequencyMap, int i){
        int frequency = frequencyMap.getOrDefault(i,0);
        frequency++;
        frequencyMap.put(i,frequency);
    }

    void remove(Map<Integer,Integer> frequencyMap, int i){
        if(!frequencyMap.containsKey(i))
            return;

        int frequency = frequencyMap.get(i);
        frequency--;

        if(frequency == 0)
            frequencyMap.remove(i);
        else
            frequencyMap.put(i, frequency);

    }
}
