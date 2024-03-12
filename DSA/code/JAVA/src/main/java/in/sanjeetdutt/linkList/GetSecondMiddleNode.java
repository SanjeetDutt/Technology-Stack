package in.sanjeetdutt.linkList;

/*
Write a code to return the middle node
if odd nodes return middle node
if even return second middle node

Example
1-2-3-4-5 => ans = 3
1-2-3-4 => ans = 3
 */
public class GetSecondMiddleNode {

    /*
    Slow and fast pointer
     */

    ListNode getMiddle(ListNode head){

        ListNode pointerA = head;
        ListNode pointerB = head;

        while (pointerB.next != null){
            pointerA = pointerA.next;

            if(pointerB.next.next == null) return pointerA;
            pointerB = pointerB.next.next;
        }

        return pointerA;

    }
}
