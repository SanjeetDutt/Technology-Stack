package in.sanjeetdutt.linkList;

public class SortLinkList {
    public ListNode sortList(ListNode head) {

        // Only one node in the list, which is already sorted.
        if(head == null || head.next == null) return head;

        // Break link list into two half
        // listA and listB
        ListNode middleNode = getFirstMiddleNode(head);
        ListNode listA = head;
        ListNode listB = middleNode.next;
        middleNode.next = null;

        //Sort list A
        listA = sortList(listA);
        //Sort list B
        listB = sortList(listB);

        // merge two sorted list
        return mergeSortedList(listA, listB);

    }

    ListNode getFirstMiddleNode (ListNode head){

        ListNode pointerA = head;
        ListNode pointerB = head;

        while (pointerB.next != null){

            if(pointerB.next.next == null) return pointerA;

            pointerB = pointerB.next.next;
            pointerA = pointerA.next;
        }

        return pointerA;

    }

    ListNode mergeSortedList (ListNode listA, ListNode listB){
        ListNode head = null;
        ListNode pointer = null;

        while (listA != null && listB != null){
            ListNode nodeToAdd;

            if(listA.val < listB.val){
                // Put node from list A in queue
                nodeToAdd = listA;
                listA = listA.next;
            } else {
                // Put node from list B in queue
                nodeToAdd = listB;
                listB = listB.next;
            }

            if(head == null){
                head = nodeToAdd;
                pointer = nodeToAdd;
            } else {
                pointer.next = nodeToAdd;
                pointer = pointer.next;
            }

        }

        while (listA != null){
            pointer.next = listA;
            pointer = pointer.next;
            listA = listA.next;
        }

        while (listB != null){
            pointer.next = listB;
            pointer = pointer.next;
            listB = listB.next;
        }


        return head;
    }
}
