package in.sanjeetdutt.linkList;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PalindromeCheckTest {

    @Test
    void testEvenNode1(){
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(3);
        ListNode D = new ListNode(4);

        A.next = B;
        B.next = C;
        C.next = D;

        PalindromeCheck palindromeCheck = new PalindromeCheck();

        assertEquals(palindromeCheck.lPalin(A), 0);
    }

    @Test
    void testEvenNode2(){
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(2);
        ListNode D = new ListNode(1);

        A.next = B;
        B.next = C;
        C.next = D;

        PalindromeCheck palindromeCheck = new PalindromeCheck();

        assertEquals(palindromeCheck.lPalin(A), 1);
    }

    @Test
    void testOddNode1(){
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(3);

        A.next = B;
        B.next = C;

        PalindromeCheck palindromeCheck = new PalindromeCheck();

        assertEquals(palindromeCheck.lPalin(A), 0);
    }

    @Test
    void testOddNode2(){
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(1);

        A.next = B;
        B.next = C;

        PalindromeCheck palindromeCheck = new PalindromeCheck();

        assertEquals(palindromeCheck.lPalin(A), 1);
    }

    @Test
    void scalarTestFail1(){
        ListNode A = new ListNode(1);

        PalindromeCheck palindromeCheck = new PalindromeCheck();

        assertEquals(palindromeCheck.lPalin(A), 1);
    }


}
