package in.sanjeetdutt.array;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class RotateArrayTest {

    @Test
    void main(){

        RotateArray rotateArray = new RotateArray();

        Assertions.assertArrayEquals(
                rotateArray.rotateArray(new int[]{1,2,3,4,5},5),
                new int[]{1,2,3,4,5}
        );

        Assertions.assertArrayEquals(
                rotateArray.rotateArray(new int[]{1,2,3,4,5},1),
                new int[]{2,3,4,5,1}
        );

        Assertions.assertArrayEquals(
                rotateArray.rotateArray(new int[]{1,2,3,4,5},6),
                new int[]{2,3,4,5,1}
        );


    }

}
