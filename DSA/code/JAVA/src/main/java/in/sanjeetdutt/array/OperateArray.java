package in.sanjeetdutt.array;

/**
 * Give 0 array and perform queries
 * Query = (i,x) => Add x to all the number from i to N-1
 * EX: [0 0 0 0 0 0 0]
 * Q:[[1,3],[4,2],[3,1]]
 * ans = [0 3 3 4 6 6 6]
 * BF: Loop through queries and add x from i to N-1 => TC=O(N*Q) SC=O(1)
 * Carry forward techniques
 * loop through queries and add x to ith index
 * [0 3 0 1 2 0 0]
 * loop through array and carry forward the value
 * [0 3 3 4 6 6 6]
 * TC=O(Q+N) SC=O(1)
 */
public class OperateArray {
    int[] solve(int[] array, int[][] queries){

        for(int[] query : queries){
            int i = query[0];
            int x = query[1];

            array[i] += x;
        }

        for(int i = 1; i< array.length; i++){
            array[i] += array[i-1];
        }

        return array;

    }
}
