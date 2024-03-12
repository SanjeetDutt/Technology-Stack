package in.sanjeetdutt.string;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CheckPalindromeTest {

    @Test
    void check() {
        CheckPalindrome checkPalindrome = new CheckPalindrome();

        assertTrue(checkPalindrome.check("MADAM"));
        assertFalse(checkPalindrome.check("SANJEET"));
    }
}
