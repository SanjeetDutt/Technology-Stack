package in.sanjeetdutt.stacks;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PassingGameTest {

    @Test
    void solve() {
        PassingGame game = new PassingGame();
        int ans = game.solve(10,23,new int[]{86, 63, 60, 0, 47, 0, 99, 9, 0, 0});

        assertEquals(ans, 63);
    }
}
