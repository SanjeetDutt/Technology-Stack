package in.sanjeetdutt.tree;

/*
Given a binary tree A, invert the binary tree and return it.

Inverting refers to making the left child the right child and vice versa
 */
public class InvertBinaryTree {
    public TreeNode invertTree(TreeNode A) {
        if(A.right!= null && A.left!=null){
            TreeNode temp = A.right;
            A.right = A.left;
            A.left = temp;

            invertTree(A.left);
            invertTree(A.right);
        } else if(A.left != null){
            A.right = A.left;
            A.left = null;
            invertTree(A.right);
        } else if (A.right != null){
            A.left = A.right;
            A.right = null;
            invertTree(A.left);
        }

        return A;
    }
}
