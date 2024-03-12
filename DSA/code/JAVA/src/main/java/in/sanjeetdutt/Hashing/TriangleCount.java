package in.sanjeetdutt.Hashing;

import java.util.HashMap;
import java.util.Map;

/**
 * Given coordinates of N-distinct points on a 2D plane
 * count the no of triangles whose 2 small sides are parallel to x and y-axis
 *
 * a = [1 3 5 5 1]
 * b = [3 3 3 1 1]
 */
public class TriangleCount {

    int count (int[] A, int[] B){

        int count = 0;

        Map<Integer, Integer> frequencyX = new HashMap<>();
        Map<Integer, Integer> frequencyY = new HashMap<>();

        for(int x : A)
            frequencyX.put(x, frequencyX.getOrDefault(x,0)+1);

        for(int y : B)
            frequencyY.put(y, frequencyY.getOrDefault(y,0)+1);

        for(int i = 0 ; i < A.length; i++){
            int x = A[i];
            int y = B[i];

            count += (frequencyX.get(x)-1) * (frequencyY.get(y)-1);
        }

        return count;

    }

}
