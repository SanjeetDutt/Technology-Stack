package in.sanjeetdutt.array.matrix;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


class PrintBoundaryTest {
    @Test
    void test(){

        int[][] matrix = new int[3][];
        matrix[0] = new int[]{1,2,3};
        matrix[1] = new int[]{4,5,6};
        matrix[2] = new int[]{7,8,9};

        PrintBoundary printBoundary = new PrintBoundary();

        Assertions.assertEquals(
                printBoundary.printBoundary(matrix),
                "12369874"
        );
    }

}
