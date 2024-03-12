package in.sanjeetdutt.tree;

import in.sanjeetdutt.tree.IterativeTraverse.Node;
import in.sanjeetdutt.tree.IterativeTraverse.Pair;

//Given preorder and inorder array of a binary tree with distinct value. Construct binary tree

//Example:  preOrder =  [8 6 2 11 16 10 12 4 14 18 9 15] <== 8 will be always be root node value
//          inOrder =   [11 2 16 6 10 12 8 14 18 4 9 15] <== Find 8 in this and left side is left sub tree and right is right sub tree
public class BuildTreeFromDistinctValue {
    int[] preOrder = null;
    int[] inOrder = null;

    Node build(int[] preOrder, int[] inOrder){
        this.inOrder = inOrder;
        this.preOrder = preOrder;

        Node root = buildTree(
                new Pair<>(
                        0,
                        preOrder.length-1
                ),
                new Pair<>(
                        0,
                        inOrder.length-1
                )
        );

        return root;

    }

    Node buildTree(Pair<Integer, Integer> preOrderIndex, Pair<Integer, Integer> inOrderIndex){

        int preOrderStart = preOrderIndex.d1;
        int preOrderEnd = preOrderIndex.d2;

        int inOrderStart = inOrderIndex.d1;
        int inOrderEnd = inOrderIndex.d2;

        // Validating Ranges
        if(rangeCheck(preOrderStart, 0, preOrderEnd)) return null;
        if(rangeCheck(preOrderEnd, preOrderStart, preOrder.length - 1)) return null;

        if(rangeCheck(inOrderStart, 0, inOrderEnd)) return null;
        if(rangeCheck(inOrderEnd, inOrderStart, inOrder.length - 1)) return null;

        // Get node value
        int nodeValue = preOrder[preOrderStart];

        // find corresponding element in the inOrder
        Integer inOrderIdx = findInOrderIdx(nodeValue);
        if(inOrderIdx == null) return null;

        if(inOrderIdx < inOrderStart) return null;

        int preOrderIdx = preOrderStart + (inOrderIdx - inOrderStart);

        // Left tree pairing
        Pair<Integer, Integer> LT_IN_Pair = new Pair<>(inOrderStart, inOrderIdx-1);
        Pair<Integer, Integer> LT_PRE_Pair = new Pair<>(preOrderStart+1, preOrderIdx);

        // Right tree pairing
        Pair<Integer, Integer> RT_IN_Pair = new Pair<>(inOrderIdx + 1, inOrderEnd);
        Pair<Integer, Integer> RT_PRE_Pair = new Pair<>(preOrderIdx+1, preOrderEnd);


        Node node = new Node(nodeValue);

        node.leftNode = buildTree(LT_PRE_Pair, LT_IN_Pair);
        node.rightNode = buildTree(RT_PRE_Pair, RT_IN_Pair);

        return node;

    }

    boolean rangeCheck(int value, int from, int till){
        if(value < from) return true;
        if(value > till) return true;
        return false;
    }

    Integer findInOrderIdx(int value){
        for(int i = 0 ; i < inOrder.length; i++)
            if(inOrder[i] == value)
                return i;

        return null;
    }


}
