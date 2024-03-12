package in.sanjeetdutt.linkList;

import java.util.HashMap;

/*
Problem Description
You are given a linked list A
Each node in the linked list contains two pointers: a next pointer and a random pointer
The next pointer points to the next node in the list
The random pointer can point to any node in the list, or it can be NULL
Your task is to create a deep copy of the linked list A
The copied list should be a completely separate linked list from the original list, but with the same node values and random pointer connections as the original list
You should create a new linked list B, where each node in B has the same value as the corresponding node in A
The next and random pointers of each node in B should point to the corresponding nodes in B (rather than A)


 */
public class CopyList {

    public RandomListNode copyRandomList(RandomListNode head) {

        // duplicate the link list and make a hashmap where key as old obj and val as new obj
        RandomListNode newHead = new RandomListNode(head.label);
        HashMap<RandomListNode, RandomListNode> nodeHashMap = new HashMap<>();
        nodeHashMap.put(head, newHead);

        RandomListNode oldPointer = head.next;
        RandomListNode newPointer = newHead;

        while (oldPointer != null){
            RandomListNode newNode = new RandomListNode(oldPointer.label);
            nodeHashMap.put(oldPointer, newNode);
            newPointer.next = newNode;
            newPointer = newPointer.next;
            oldPointer = oldPointer.next;
        }

        newPointer = newHead;
        oldPointer = head;

        while (oldPointer != null){
            if(oldPointer.random != null)
            {
                RandomListNode randomPointer = oldPointer.random;
                RandomListNode newRandomPointer = nodeHashMap.get(randomPointer);
                newPointer.random = newRandomPointer;

            }

            oldPointer = oldPointer.next;
            newPointer = newPointer.next;
        }

        return newHead;
    }



//Definition for singly-linked list with a random pointer.
class RandomListNode {
    int label;
    RandomListNode next, random;
    RandomListNode(int x) { this.label = x; }
};

}
