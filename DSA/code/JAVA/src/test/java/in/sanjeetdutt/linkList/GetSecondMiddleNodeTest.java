package in.sanjeetdutt.linkList;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GetSecondMiddleNodeTest {

    @Test
    void testEvenNodes() {
        GetSecondMiddleNode getMiddleNode = new GetSecondMiddleNode();

        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(3);
        ListNode D = new ListNode(4);

        A.next = B;
        B.next = C;
        C.next = D;

        assertEquals(getMiddleNode.getMiddle(A).val, 3);
    }

    @Test
    void testOddNodes() {
        GetSecondMiddleNode getMiddleNode = new GetSecondMiddleNode();

        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(3);
        ListNode D = new ListNode(4);
        ListNode E = new ListNode(5);

        A.next = B;
        B.next = C;
        C.next = D;
        D.next = E;

        assertEquals(getMiddleNode.getMiddle(A).val, 3);
    }
}
