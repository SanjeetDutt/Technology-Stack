package in.sanjeetdutt.array.matrix;

/**
 * Rotate matrix by 90deg clockwise
 * 1    2   3
 * 4    5   6
 * 7    8   9
 * rotate 90 deg
 * 7    4   1
 * 8    5   2
 * 9    6   3
 * Observation:
 * 951 are still diagonal but mirrored
 * 1    4   7
 * 2    5   8
 * 3    6   9
 * It is transpose of the given matrix
 */
public class Rotate {

    int[][] matrix(int[][] matrix){
        // First transpose the matrix
        transpose(matrix);
        // Then mirror if
        mirror(matrix);

        return matrix;
    }

    private void mirror(int[][] matrix) {
        int N = matrix.length;

        for(int i = 0 ; i < N; i++){
            for(int j = 0 ; j < N/2; j++){
                swap(matrix, i, j, i, N-j-1);
            }
        }

    }

    private void transpose(int[][] matrix) {
        int N = matrix.length;

        for(int i = 0 ; i < N; i++){
            for(int j = 0 ; j < i; j++){
                swap(matrix, i , j, j, i);
            }
        }
    }

    private void swap(int[][] matrix, int ifrom, int jfrom, int ito, int jto) {
        int temp = matrix[ifrom][jfrom];
        matrix[ifrom][jfrom] = matrix[ito][jto];
        matrix[ito][jto] = temp;
    }


}
