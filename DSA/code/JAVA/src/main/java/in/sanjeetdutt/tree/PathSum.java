package in.sanjeetdutt.tree;
/*
Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

example:
Tree:     5
         / \
        4   8
       /   / \
      11  13  4
     /  \      \
    7    2      1

 B = 22

 There exist a root-to-leaf path 5 -> 4 -> 11 -> 2 which has sum 22. So, return 1.
 */
public class PathSum {
    public int hasPathSum(TreeNode root, int expect) {
        return hasPathSum(root, expect, 0);
    }

    public int hasPathSum(TreeNode A, int expect, int carryForward){
        boolean isLeafNode = A.left == null && A.right == null;
        int currentSum = carryForward + A.val;

        if(isLeafNode){
            if(currentSum == expect){
                return 1;
            } else {
                return 0;
            }
        } else {
            if(A.left != null && hasPathSum(A.left, expect, currentSum) == 1) return 1;

            if(A.right != null && hasPathSum(A.right, expect, currentSum) == 1) return 1;

            return 0;
        }

    }
}
