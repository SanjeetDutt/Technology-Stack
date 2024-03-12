package in.sanjeetdutt.linkList;
/*
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
set(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting the new item.
The LRUCache will be initialized with an integer corresponding to its capacity. Capacity indicates the maximum number of unique keys it can hold at a time.

Definition of "least recently used" : Access to an item is defined as a get or a set operation of the item. "Least recently used" item is the one with the oldest access time.

NOTE: If you are using any global variables, make sure to clear them in the constructor.

Example :

Input :
         capacity = 2
         set(1, 10)
         set(5, 12)
         get(5)        returns 12
         get(1)        returns 10
         get(10)       returns -1
         set(6, 14)    this pushes out key = 5 as LRU is full.
         get(5)        returns -1
 */
public class LRUCache {
    int capacity;
    int length;
    LRUNode head;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.length = 0;
        head = null;
    }

    public int get(int key) {
        LRUNode pointer = head;
        LRUNode previous = null;

        // find the node with given key and also point the previous node
        while (pointer != null && pointer.key != key){
            previous = pointer;
            pointer = pointer.next;
        }
        // if no node found
        if(pointer == null){
            return -1;
        }

        // else do following
        //1. break the connection
        // pointer == head
        //(DONE) pointer == head && head.next = null
        // (DONE) pointer == lastNode
        // pointer != lastNode and pointer != head
        if(pointer == head && head.next == null){
            return pointer.val;
        }

        LRUNode lastNode = getLastNode();

        if(pointer == lastNode){
            return pointer.val;
        }

        if(pointer == head){
            this.head = pointer.next;
        }

        if(previous!=null){
            previous.next = pointer.next;
        }

        pointer.next = null;

        //2. add the current pointer to the end of the chain
        lastNode.next = pointer;
        return pointer.val;
    }

    public void set(int key, int value) {

        LRUNode lastNode = getLastNode();

        if(this.length >= this.capacity){
            //eliminate node from start and add a new node at end
            this.head = this.head.next;
        }

        if(this.length == 0){
            this.head = new LRUNode(key, value);
        } else {
            lastNode.next = new LRUNode(key, value);
        }

        this.length++;

    }

    LRUNode getLastNode(){

        if(this.head == null) return null;

        LRUNode lastNode = this.head;

        while (lastNode.next != null){
            lastNode = lastNode.next;
        }
        return lastNode;
    }

    class LRUNode {
        int key;
        int val;
        LRUNode next;

        public LRUNode(int key, int val) {

            this.key = key;
            this.val = val;
            this.next = null;
        }
    }

}
