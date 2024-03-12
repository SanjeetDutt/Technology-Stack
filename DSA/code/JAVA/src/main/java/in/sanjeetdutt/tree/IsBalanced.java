package in.sanjeetdutt.tree;

/*
Given a root of binary tree A, determine if it is height-balanced.

A height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.


 */
public class IsBalanced {
    int isBalanced = 1;
    public int isBalanced(TreeNode A) {

        getHeight(A);

        return isBalanced;


    }

    int getHeight(TreeNode node){

        if(node == null) return 0;

        int leftHeight = getHeight(node.left);

        int rightHeight = getHeight(node.right);

        if(Math.abs(leftHeight - rightHeight) > 1) isBalanced = 0;

        return Math.max(leftHeight, rightHeight) + 1;
    }
}
