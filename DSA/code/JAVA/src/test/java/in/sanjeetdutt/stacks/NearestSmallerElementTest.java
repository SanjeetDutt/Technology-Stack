package in.sanjeetdutt.stacks;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class NearestSmallerElementTest {

    @Test
    void prevSmaller() {
        NearestSmallerElement nearestSmallerElement = new NearestSmallerElement();

        ArrayList<Integer> question = new ArrayList<>(Arrays.asList(34,35,27,42,5,28,39,20,28));
        ArrayList<Integer> answer = new ArrayList<>(Arrays.asList(-1,34, -1, 27, -1, 5, 28, 5, 20 ));

        assertArrayEquals(
                nearestSmallerElement.prevSmaller(question).toArray(), answer.toArray()
        );
    }
}
