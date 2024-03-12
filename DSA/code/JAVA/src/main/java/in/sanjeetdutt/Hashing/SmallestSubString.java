package in.sanjeetdutt.Hashing;
// Given a string str of length N & string A.
// Find the length of the smallest substring in str which contain all the char of A in any order

//Example : str:ABCDBCXYA  A:CAC => Answer:6(0 to 5)

// Brute force: For every substring check str having A. TC=O(n3)

// Optimized solution:
// 1. Create 2 pointers(start, end) for sub array identification
// 2. answer variable: to store the final answer
// 3. Make a frequency map for array A (SC=C)
// 4. While end++ make a temporary map for the sub array from start to end (inclusive)
// 5. compare the frequency map of A with temp and is all value exists then ans = min(ans, end-start+1)
// 6. try to optimize the ans with start++

public class SmallestSubString {
    int frequencyLength = 256;
    int find(String str, String A){

        int start = 0, end = 0, ans = str.length();

        int[] frequencyA = new int[frequencyLength];

        for(char a : A.toCharArray()){
            frequencyA[a - 'A']++;
        }

        int[] temp = new int[frequencyLength];
        temp[str.charAt(0) - 'A']++;

        while (start <= end && end <= str.length()){
            if(compareFrequencyArray(frequencyA, temp)){
                // obtained subarray is a possible answer
                ans = Math.min(ans, end - start + 1);

                //further answer can be optimized by start++
                temp[str.charAt(start) - 'A']--;
                start++;
            } else {
                // finding a better answer by end++
                end++;
                if(end < str.length())
                    temp[str.charAt(end) - 'A']++;
            }
        }

        return ans;
    }

    /**
     * Function to compare frequency array A and B and check B has all value of ar or not
     */
    boolean compareFrequencyArray(int[] A, int[] B){
        for(int i = 0; i < A.length; i++){
            int a = A[i];
            int b = B[i];

            if(a > b)
                return false;
        }

        return true;
    }

}
