package in.sanjeetdutt.linkList;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RemoveLoopingTest {

    @Test
    void solve() {
        ListNode A = new ListNode(3);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(4);
        ListNode D = new ListNode(5);
        ListNode E = new ListNode(6);

        A.next = B;
        B.next = C;
        C.next = D;
        D.next = E;
        E.next = C;

        RemoveLooping removeLooping = new RemoveLooping();

        ListNode head = removeLooping.solve(A);

        StringBuilder str = new StringBuilder();

        while (head!=null){
            str.append(head.val);
            head = head.next;
        }

        assertEquals(str.toString(), "32456");

    }
}
