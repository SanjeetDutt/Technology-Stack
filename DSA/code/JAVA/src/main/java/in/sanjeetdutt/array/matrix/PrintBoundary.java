package in.sanjeetdutt.array.matrix;

/**
 * Given a matrix and print boundary
 */
public class PrintBoundary {

    String printBoundary(int[][] arr){
        int N = arr.length-1;//0-base
        int M = arr[0].length-1;//0-base

        StringBuilder str = new StringBuilder();

        str.append(print(arr,0,0, 0, M));
        str.append(print(arr,1,M, N-1, M));

        str.append(printReverse(arr,N,M, N, 0));
        str.append(printReverse(arr,N-1,0, 1, 0));

        return str.toString();
    }

    String print(int[][] arr, int iFrom, int jFrom, int iTo, int jTo){
        StringBuilder str = new StringBuilder();

        for (int i = iFrom; i <= iTo; i++) {
            for (int j = jFrom; j <= jTo; j++) {
                str.append(arr[i][j]);
            }
        }

        return str.toString();
    }

    String printReverse(int[][] arr, int iFrom, int jFrom, int iTo, int jTo){
        StringBuilder str = new StringBuilder();

        for (int i = iFrom; i >= iTo; i--) {
            for (int j = jFrom; j >= jTo; j--) {
                str.append(arr[i][j]);
            }
        }

        return str.toString();
    }
}
