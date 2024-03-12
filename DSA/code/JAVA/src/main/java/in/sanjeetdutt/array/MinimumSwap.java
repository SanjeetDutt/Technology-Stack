package in.sanjeetdutt.array;

/**
 * Find minimum swap need to bring n boys together
 * BGBGBGBG[GBB] = 1 swap
 * For a given window girls count is min. swap needed and among them min is ans
 */
public class MinimumSwap {

    int calculate(char[] series, int N){
        int girlCount = 0;


        for ( int i = 0 ; i < N; i++){
            if(series[i] == 'G')
                girlCount++;
        }

        int start = 1;
        int end = N;

        int minCount = girlCount;

        while (end < series.length){

            if (series[start-1] == 'G')
                girlCount--;

            if(series[end] == 'G')
                girlCount++;

            if(girlCount < minCount)
                minCount = girlCount;

            start++;
            end++;
        }


        return minCount;
    }
}
