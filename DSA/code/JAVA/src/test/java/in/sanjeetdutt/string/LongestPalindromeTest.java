package in.sanjeetdutt.string;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LongestPalindromeTest {

    LongestPalindrome longestPalindrome = new LongestPalindrome();

    @Test
    void findLength() {
        assertEquals(longestPalindrome.findLength("a"),1);
        assertEquals(longestPalindrome.findLength("aa"),2);
        assertEquals(longestPalindrome.findLength("daa"),2);

        assertEquals(longestPalindrome.findLength("abccccdd"),4);
    }

    @Test
    void getLongestPalindrome() {

        assertEquals(longestPalindrome.getLongestPalindrome("aa",0,1), 2);
        assertEquals(longestPalindrome.getLongestPalindrome("ad",0,1), 0);
        assertEquals(longestPalindrome.getLongestPalindrome("a",0,1), 1);
        assertEquals(longestPalindrome.getLongestPalindrome("ada",1,1), 3);
        assertEquals(longestPalindrome.getLongestPalindrome("adda",1,2), 4);


    }
}
