package in.sanjeetdutt.array.matrix;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class TransposeTest {

    @Test
    void Test(){
        int[][] matrix = new int[3][];
        matrix[0] = new int[]{1,2,3};
        matrix[1] = new int[]{4,5,6};
        matrix[2] = new int[]{7,8,9};

        int[][] result = new int[3][];
        result[0] = new int[]{1,4,7};
        result[1] = new int[]{2,5,8};
        result[2] = new int[]{3,6,9};

        Transpose transpose = new Transpose();
        Assertions.assertArrayEquals(
                transpose.transpose(matrix),
                result
        );
    }
}
