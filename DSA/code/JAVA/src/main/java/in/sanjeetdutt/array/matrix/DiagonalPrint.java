package in.sanjeetdutt.array.matrix;

/**
 * Given a rectangular matrix and print all its diagonal
 * 11   12  13  14
 * 21   22  23  24
 * 31   32  33  34
 * result = 11 12 21 13 22 31 14 23 32 24 33 34
 * *
 * 11 12 13
 * 21 22 23
 * 31 32 33
 * 41 42 43
 * result = 11 12 21 13 22 31 23 32 41 33 42 43
 */

public class DiagonalPrint {

    String diagonalPrint(int[][] arr){

        int N = arr.length;
        int M = arr[0].length;

        StringBuilder result = new StringBuilder();

        for(int j = 0 ; j < M; j++){
            result.append(" ").append(getDiagonal(arr, 0, j));
        }

        for(int i = 1; i < N; i++){
            result.append(" ").append(getDiagonal(arr, i, M-1));
        }

        return result.toString().trim();
    }

    String getDiagonal(int[][] arr, int row, int col){
        StringBuilder result = new StringBuilder();

        int N = arr.length;
        int M = arr[0].length;

        while (row >= 0 && row < N && col >= 0 && col < M){

            result.append(" ").append(arr[row][col]);
            row++;
            col--;

        }

        return result.toString().trim();
    }
}
