package in.sanjeetdutt.string;

//Given 2 strings A,B. Count all permutation of A in all substring of B
// Example A = XYZ, B = XYZXY, ANS=3

//Brute force = for every substring of length A.length() if substring is permutation of A count++

//Optimized solution
// 1. Make a frequency map of A
// 2. create a window of A.length() and make a frequency map of the window
// 3. if map count is same then count++

public class PermutationCount {
    int frequencyArraySize = 256;

    int count (String A, String B){
        int count = 0;
        int[] frequencyA = new int[frequencyArraySize];
        int[] frequencyTemp = new int[frequencyArraySize];
        int start = 0, end = 0;

        // Making frequency map
        for(char a : A.toCharArray()){
            frequencyA[ a - 'A']++;
        }

        while (start <= end && end < B.length()){

           frequencyTemp[B.charAt(end) - 'A']++;
           end++;

            if((end - start) == A.length()){
                // Compare, remove start, start++
                if(compareFrequencyArray(frequencyA, frequencyTemp))
                    count++;

                frequencyTemp[B.charAt(start) - 'A']--;
                start++;
            }
        }

        return count;

    }

    boolean compareFrequencyArray(int[] A, int[] B){
        for(int i = 0; i < A.length; i++){
            if(A[i] != B[i])
                return false;
        }

        return true;
    }

}
