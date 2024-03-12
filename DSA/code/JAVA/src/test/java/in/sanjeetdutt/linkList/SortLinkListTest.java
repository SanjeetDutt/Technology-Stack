package in.sanjeetdutt.linkList;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SortLinkListTest {

    @Test
    void sortList() {
        ListNode A = new ListNode(8);
        ListNode B = new ListNode(4);
        ListNode C = new ListNode(2);
        ListNode D = new ListNode(1);
        ListNode E = new ListNode(9);

        A.next = B;
        B.next = C;
        C.next = D;
        D.next = E;

        SortLinkList sortLinkList = new SortLinkList();

        ListNode head = sortLinkList.sortList(A);

        StringBuilder str = new StringBuilder();

        while (head != null){
            str.append(head.val);
            head = head.next;
        }

        assertEquals(str.toString(),"12489");
    }

    @Test
    void noNode (){
        SortLinkList sortLinkList = new SortLinkList();
        ListNode head = sortLinkList.sortList(null);
        assertNull(head);
    }
}
