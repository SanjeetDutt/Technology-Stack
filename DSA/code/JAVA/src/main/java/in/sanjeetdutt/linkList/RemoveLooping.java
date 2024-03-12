package in.sanjeetdutt.linkList;
/*
You are given a linked list that contains a loop.
You need to find the node, which creates a loop and break it by making the node point to NULL.

Example
3 -> 2 -> 4 -> 5 -> 6
          ^         |
          |         |
          -----------

Answer =  3 -> 2 -> 4 -> 5 -> 6 -> NULL
 */
public class RemoveLooping {
    /*
    Slow and fast pointer approach
     */
    public ListNode solve(ListNode head) {

        ListNode fastPointer = head;
        ListNode slowPointer = head;

        // move the pointer
        fastPointer = fastPointer.next.next;
        slowPointer = slowPointer.next;

        while (fastPointer != slowPointer){
            fastPointer = fastPointer.next.next;
            slowPointer = slowPointer.next;
        }

        // Now moving both the pointer in same speed and will find the pointer of looping point of occurrence
        // but before that setting slow pointer to head

        slowPointer = head;

        while (fastPointer != slowPointer){
            fastPointer = fastPointer.next;
            slowPointer = slowPointer.next;
        }

        ListNode valueToFind = fastPointer;

        // loop through every node and check if node.next.value = valueToFind, then node.next = null

        while (fastPointer.next != valueToFind){
            fastPointer = fastPointer.next;
        }

        fastPointer.next = null;

        return head;
    }
}
