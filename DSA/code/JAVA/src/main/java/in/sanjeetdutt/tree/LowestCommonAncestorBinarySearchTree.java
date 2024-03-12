package in.sanjeetdutt.tree;

/*
Given a Binary Search Tree A. Also given are two nodes B and C. Find the lowest common ancestor of the two nodes.

Note 1 :- It is guaranteed that the nodes B and C exist.

Note 2 :- The LCA of B and C in A is the shared ancestor of B and C that is located farthest from the root.

Example Input
Input 1:

            15
          /    \
        12      20
        / \    /  \
       10  14  16  27
      /
     8

     B = 8
     C = 20
     ans = 15
Input 2:

            8
           / \
          6  21
         / \
        1   7

     B = 7
     C = 1
     ans = 6
 */
public class LowestCommonAncestorBinarySearchTree {
    public int solve(TreeNode A, int B, int C) {
        int currentVal = A.val;

        if(B < currentVal && C < currentVal){
            return solve(A.left, B, C);
        }

        if(B > currentVal && C > currentVal){
            return solve(A.right, B, C);
        }

        return currentVal;

    }
}
