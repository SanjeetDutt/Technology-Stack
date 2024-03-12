package in.sanjeetdutt.heaps;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class MergeSortedLinkListTest {

    @Test
    void mergeKLists() {
        MergeSortedLinkList mergeSortedLinkList = new MergeSortedLinkList();
        ArrayList<ListNode> arrayList = new ArrayList<>();
        buildParams(new int[]{1,10,20}, arrayList);
        buildParams(new int[]{4,11,13}, arrayList);
        buildParams(new int[]{3,8,9}, arrayList);



    }

    ArrayList<ListNode> buildParams(int[] array, ArrayList<ListNode> a){

        ListNode listNode = new ListNode(array[0]);
        ListNode pointer = listNode;

        for (int i = 1; i < array.length; i++) {

            pointer.next = new ListNode(array[i]);
            pointer = pointer.next;

        }

        a.add(listNode);
        return a;
    }




}
