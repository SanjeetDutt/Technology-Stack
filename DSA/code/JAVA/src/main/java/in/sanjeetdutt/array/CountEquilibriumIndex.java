package in.sanjeetdutt.array;

/**
 * Equilibrium index = where LHS sum = RHS sum
 *
 * brute force: for each index : count RHS sum count LHS  sum if equal count++
 * tc = n^2 sc = 1
 *
 * idea #2: prefix and suffix sum
 * tc = n sc = n
 *
 * ide #3: carry forward
 * tc = n sc=1
 */

public class CountEquilibriumIndex {
    int countEquilibriumIndex(int[] arr){
//        return countByPrefixSum(arr);
        return countByCarryForward(arr);
    }

    private int countByCarryForward(int[] arr) {

        int N = arr.length;

        int Lsum = 0;
        int Rsum = 0;
        for(int i : arr){
            Rsum += i;
        }

        int count = 0;

        for (int j : arr) {
            Lsum += j;
            if (Lsum == Rsum) {
                count++;
            }
            Rsum -= j;
        }


        return count;
    }


    /**
     * COUNTING BY PREFIX SUM WAY
     */
    private int countByPrefixSum(int[] arr) {

        int[] pArr = createPrefixSum(arr);
        int[] sArr = createSuffixSum(arr);

        int count = 0;

        for (int i = 0; i < arr.length; i++) {
            if(pArr[i] == sArr[i])
                count++;
        }


        return count;
    }

    private int[] createSuffixSum(int[] arr) {

        int sum = 0;
        int[] ssArr = new int[arr.length];
        for (int i = arr.length-1; i >= 0; i--) {
            sum += arr[i];
            ssArr[i] = sum;
        }

        return ssArr;

    }

    private int[] createPrefixSum(int[] arr) {
        int sum = 0;
        int[] psArr = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            psArr[i] = sum;
        }

        return psArr;
    }


}
