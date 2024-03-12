package in.sanjeetdutt.linkList;

/*
Write a code to return the middle node
if odd nodes return middle node
if even return first middle node

Example
1-2-3-4-5 => ans = 3
1-2-3-4 => ans = 2
 */
public class GetMiddleNode {

    /*
    Slow and fast pointer
     */

    ListNode getMiddle(ListNode head){

        ListNode pointerA = head;
        ListNode pointerB = head;

        while (pointerB.next != null){

            if(pointerB.next.next == null) return pointerA;

            pointerB = pointerB.next.next;
            pointerA = pointerA.next;
        }

        return pointerA;

    }
}
