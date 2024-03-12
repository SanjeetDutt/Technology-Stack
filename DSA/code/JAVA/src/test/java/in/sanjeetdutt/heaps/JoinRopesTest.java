package in.sanjeetdutt.heaps;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JoinRopesTest {

    @Test
    void solve() {
        JoinRopes joinRopes =new JoinRopes();

        assertEquals(joinRopes.solve(new int[]{1,2,3,4,5}), 33);
        assertEquals(joinRopes.solve(new int[]{5,17,100,11,}), 182);


    }
}
