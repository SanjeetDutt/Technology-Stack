package in.sanjeetdutt.array.matrix;

/**
 * Given array and print clockwise spiral
 * 123
 * 456
 * 789
 * result = 123698745
 */
public class SpiralPrinting {
    String printSpiral(int[][] matrix){
        StringBuilder str = new StringBuilder();

        int iFrom = 0;
        int iTo = matrix.length-1;

        int jFrom = 0;
        int jTo = matrix[0].length-1;

        while (iFrom <= iTo && jFrom <= jTo){
            if(iFrom == iTo || jFrom == jTo)
            {
                str.append(print(matrix,iFrom,jFrom,iTo,jTo));
            }
            else
            {
                str.append(printBoundary(matrix, iFrom, jFrom, iTo, jTo));
            }

            iFrom++;
            iTo--;

            jFrom++;
            jTo--;
        }

        return str.toString();
    }

    String printBoundary(int[][] arr, int iFrom, int jFrom, int iTo, int jTo){

        StringBuilder str = new StringBuilder();

        str.append(print(arr,iFrom,jFrom, iFrom, jTo));
        str.append(print(arr,iFrom+1,jTo, iTo-1, jTo));

        str.append(printReverse(arr,iTo,jTo, iTo, jFrom));
        str.append(printReverse(arr,iTo-1,jFrom, iFrom+1, jFrom));

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
