package in.sanjeetdutt.linkList;

/*
You are given a singly linked list having head node A. You have to reverse the linked list and return the head node of that reversed list.

NOTE: You have to do it in-place and in one-pass.

EXAMPLE
 A = 1 -> 2 -> 3 -> 4 -> 5 -> NULL
 ANSWER = 5 -> 4 -> 3 -> 2 -> 1 -> NULL
 */

public class ReverseLinkList {

    public ListNode reverseList(ListNode A) {
        ListNode previousPointer = null;
        ListNode currentPointer = A;
        ListNode nextPointer = currentPointer.next;


        while (nextPointer != null){

            currentPointer.next = previousPointer; // Changing the pointer to previous direction

            // moving the pointer ahead
            previousPointer = currentPointer;
            currentPointer = nextPointer;
            nextPointer = nextPointer.next;


        }

        currentPointer.next = previousPointer;

        return currentPointer;
    }
}


//Definition for singly-linked list.
class ListNode {
    public int val;
    public ListNode next;
    ListNode(int x) { val = x; next = null; }
}
