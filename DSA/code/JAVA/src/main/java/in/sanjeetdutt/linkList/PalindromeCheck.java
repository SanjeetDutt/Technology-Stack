package in.sanjeetdutt.linkList;

/*
Given a singly linked list A, determine if it's a palindrome. Return 1 or 0, denoting if it's a palindrome or not, respectively.

Example
A = [1, 2, 2, 1]
Ans = 1

A = [1,2,3]
Ans = 0
 */
public class PalindromeCheck {
    public int lPalin(ListNode A) {

        if(A.next == null) return 1;

        // middleNode = Get first middle node
        ListNode middleNode = getMiddleNode(A);

        // Break the chain into 2 equal chain
        ListNode firstHead = A;
        ListNode secondHead = middleNode.next;
        middleNode.next = null;

        // Reverse the second list
        secondHead = reverseLinkedList(secondHead);

        // Compare two list and return result
        while (secondHead != null){
            if(secondHead.val != firstHead.val) return 0;

            secondHead = secondHead.next;
            firstHead = firstHead.next;
        }

        return 1;


    }

    ListNode getMiddleNode(ListNode head){

        ListNode pointerA = head;
        ListNode pointerB = head;

        while (pointerB.next!=null){

            if(pointerB.next.next == null) return pointerA;

            pointerB = pointerB.next.next;
            pointerA = pointerA.next;
        }

        return pointerA;
    }

    ListNode reverseLinkedList(ListNode head){
        ListNode previousPointer = null;
        ListNode currentPointer = head;
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
