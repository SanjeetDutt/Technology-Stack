package in.sanjeetdutt.tree;

import java.util.ArrayList;

/*
Given a binary tree, return the inorder traversal of its nodes' values.

Left tree - Data - Right tree

Example :
   1
  / \
 6   2
    /
   3

Answer =  [6, 1, 3, 2]
 */
public class InorderTraverse {
    ArrayList<Integer> result;

    ArrayList<Integer> inorderTraversal(TreeNode A){

        result = new ArrayList<>();
        traverse(A);
        return result;

    }

    void traverse(TreeNode node){
        if(node.left != null) traverse(node.left);
        result.add(node.val);
        if(node.right != null) traverse(node.right);
    }

}

//Definition for binary tree
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
        left = null;
        right = null;
    }
}
