package in.sanjeetdutt.searching;

import in.sanjeetdutt._Utility.AssertUtility;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LocalMinimaTest {

    @Test
    void find() {
        LocalMinima localMinima = new LocalMinima();

        int result = localMinima.find(new int[]{9,8,7,3,6,4,1,5,2});

        assertTrue( AssertUtility.IsAny(result, new Integer[]{3,1,2}));

    }
}
