package in.sanjeetdutt.linkList;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GetMiddleNodeTest {

    @Test
    void testEvenNodes() {
        GetMiddleNode getMiddleNode = new GetMiddleNode();

        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(3);
        ListNode D = new ListNode(4);

        A.next = B;
        B.next = C;
        C.next = D;

        assertEquals(getMiddleNode.getMiddle(A).val, 2);
    }

    @Test
    void testOddNodes() {
        GetMiddleNode getMiddleNode = new GetMiddleNode();

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
