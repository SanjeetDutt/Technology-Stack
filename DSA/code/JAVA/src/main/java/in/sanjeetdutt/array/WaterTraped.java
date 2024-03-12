package in.sanjeetdutt.array;

/**
 * Given an int array = height of building, find water trap.
 * <a href="https://drive.google.com/file/d/1pOOl7bexrqCfNTQ9_B0p-wr9YXPLwKr1/view?usp=drive_link">SOLUTION 1</a>
 * OBSERVATION: In maxOnRight and maxOnLeft array we are storing value just to compare the limit which can be replaced by a variable, hence space complexity can be optimized
 *  <a href="https://drive.google.com/file/d/1pYJ8N6NlWrALYV-vKY1Ms775w5Y_AXde/view?usp=sharing">SOLUTION Optimized</a>
 * Space complexity improved to O(1)
 */
public class WaterTraped {
    int find(int[] buildingHeight){
        int[] maxOnLeft = getMaxHeightOnLeft(buildingHeight);
        int[] maxOnRight = getMaxHeightOnRight(buildingHeight);

        int waterStored = 0;

        for(int i = 0; i<buildingHeight.length; i++){
            int height = buildingHeight[i];

            int minOfMax = Integer.min(maxOnLeft[i],maxOnRight[i]);

            if(minOfMax - height > 0)
                waterStored += minOfMax - height;
        }

        return waterStored;
    }

    int[] getMaxHeightOnLeft(int[] buildingHeight) {
        int[] maxHeight = new int[buildingHeight.length];
        maxHeight[0] = 0;
        for(int i = 1; i<buildingHeight.length; i++){
            maxHeight[i] = Integer.max(buildingHeight[i-1],maxHeight[i-1]);
        }

        return maxHeight;
    }

    int[] getMaxHeightOnRight(int[] buildingHeight) {
        int N = buildingHeight.length;
        int[] maxHeight = new int[N];
        maxHeight[N-1] = 0;
        for(int i = N-2; i>=0; i--){
            maxHeight[i] = Integer.max(buildingHeight[i+1],maxHeight[i+1]);
        }

        return maxHeight;
    }

    int optimizedAnswer(int[] buildingHeight){
        int L = 0;
        int R = buildingHeight.length-1;
        int MaxL = buildingHeight[L];
        int MaxR = buildingHeight[R];
        int answer = 0;

        while (L < R){
            int Al = buildingHeight[L];
            int Ar = buildingHeight[R];
            MaxL = Integer.max(MaxL, Al);
            MaxR = Integer.max(MaxR, Ar);

            answer += Integer.min(MaxL,MaxR) - Integer.min(Al,Ar);

            if(Al < Ar){
                L++;
            } else{
                R--;
            }
        }

        return answer;
    }
}
