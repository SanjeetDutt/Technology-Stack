package in.sanjeetdutt.array.matrix;

/**
 * Transpose a matrix <== Always will be square
 *  1   2   3
 *  4   5   6
 *  7   8   9
 *  transpose to
 *  1   4   7
 *  2   5   8
 *  3   6   9
 *
 *  diagonal same
 *  upper triangle swap with lower triangle
 *
 */

public class Transpose {

    int[][] transpose(int[][] matrix){
        int N = matrix.length;

        for(int i = 0 ; i < N; i++){
            for(int j = 0 ; j < i; j++){
                swap(matrix, i , j);
            }
        }
        return matrix;
    }

    private void swap(int[][] matrix, int i, int j) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
    }
}
