package in.sanjeetdutt.array.matrix;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class DiagonalPrintTest {

    @Test
    void test(){
        DiagonalPrint diagonalPrint = new DiagonalPrint();

        int[][] matrix = new int[3][];

        matrix[0] = new int[]{1,2,3,4};
        matrix[1] = new int[]{1,2,3,4};
        matrix[2] = new int[]{1,2,3,4};

        Assertions.assertEquals(
                diagonalPrint.diagonalPrint(matrix),
                "1 2 1 3 2 1 4 3 2 4 3 4"
        );
    }

}
