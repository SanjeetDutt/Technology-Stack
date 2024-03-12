package in.sanjeetdutt.array.matrix;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class RotateTest {

    @Test
    void test(){
        Rotate rotate = new Rotate();

        int[][] matrix = new int[3][];
        matrix[0] = new int[]{1,2,3};
        matrix[1] = new int[]{4,5,6};
        matrix[2] = new int[]{7,8,9};

        int[][] result = new int[3][];
        result[0] = new int[]{7,4,1};
        result[1] = new int[]{8,5,2};
        result[2] = new int[]{9,6,3};

        Assertions.assertArrayEquals(
                rotate.matrix(matrix),
                result
        );
    }
}
