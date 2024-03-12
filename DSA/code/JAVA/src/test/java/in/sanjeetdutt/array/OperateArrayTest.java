package in.sanjeetdutt.array;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OperateArrayTest {

    OperateArray operateArray =new OperateArray();

    @Test
    void solve() {
        assertArrayEquals(operateArray.solve(new int[]{0,0,0,0,0,0,0}, new int[][]{{1,3},{4,2},{3,1}}),
                new int[]{0,3,3,4,6,6,6}
                );
    }
}
