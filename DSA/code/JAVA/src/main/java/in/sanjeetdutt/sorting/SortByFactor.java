package in.sanjeetdutt.sorting;

import java.util.Comparator;
import java.util.List;

// Sort an array based on number of factors.
// If factors are same sort on magnitude
public class SortByFactor {

    List<Integer> sort(List<Integer> A) {
        A.sort(new CustomComparator());
        return A;
    }


    private int countFactors(Integer a) {

        int count = 0;

        for (int i = 1; i < Math.sqrt(a); i++) {
            if (a % i == 0)
                count++;
        }

        return count;
    }

    private class CustomComparator implements Comparator<Integer> {
        @Override
        public int compare(Integer a, Integer b) {
            int factorA = countFactors(a);
            int factorB = countFactors(b);

            if (factorA < factorB)
                return -1;

            if (factorA == factorB && a < b)
                return -1;

            if (factorA == factorB && a == b)
                return 0;

            return 1;
        }
    }


}
