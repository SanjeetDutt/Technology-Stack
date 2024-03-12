package in.sanjeetdutt.heaps;

import java.util.ArrayList;
import java.util.PriorityQueue;

/*
Given a list containing head pointers of N sorted linked lists.
Merge these given sorted linked lists and return them as one sorted list.

Example
 1 -> 10 -> 20
 4 -> 11 -> 13
 3 -> 8 -> 9
 ANSWER:  1 -> 3 -> 4 -> 8 -> 9 -> 10 -> 11 -> 13 -> 20
 */
public class MergeSortedLinkList {
    public ListNode mergeKLists(ArrayList<ListNode> a) {

        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>();

        // Add all value into the priority
        for(ListNode listNode : a){
            ListNode pointer = listNode;

            while (pointer != null){
                priorityQueue.add(pointer.val);
                pointer = pointer.next;
            }
        }

        //iterate over the queue and build a new link list
        ListNode head = new ListNode(priorityQueue.poll());
        ListNode pointer = head;

        while (priorityQueue.size() > 0){
            ListNode newNode = new ListNode(priorityQueue.poll());
            pointer.next = newNode;
            pointer = pointer.next;
        }

        //return head of the link list
        return head;
    }
}


//Definition for singly-linked list.
class ListNode {
    public int val;
    public ListNode next;
    ListNode(int x) { val = x; next = null; }
}

