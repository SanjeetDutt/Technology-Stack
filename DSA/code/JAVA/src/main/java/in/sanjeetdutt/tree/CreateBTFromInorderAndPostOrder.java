package in.sanjeetdutt.tree;

import java.util.ArrayList;

/*
Problem Description
Given the inorder and postorder traversal of a tree, construct the binary tree.

NOTE: You may assume that duplicates do not exist in the tree.



Problem Constraints
1 <= number of nodes <= 105



Input Format
First argument is an integer array A denoting the inorder traversal of the tree.

Second argument is an integer array B denoting the postorder traversal of the tree.



Output Format
Return the root node of the binary tree.

Example Input
Input 1:

 A = [2, 1, 3]
 B = [2, 3, 1]
Input 2:

 A = [6, 1, 3, 2]
 B = [6, 3, 2, 1]


Example Output 1:

   1
  / \
 2   3
Output 2:

   1
  / \
 6   2
    /
   3


Example Explanation 1:

 Create the binary tree and return the root node of the tree.
 */
public class CreateBTFromInorderAndPostOrder {

    class TreeTraversal{
        int start;
        int end;
        ArrayList<Integer> traversal;

        public TreeTraversal(ArrayList<Integer> traversal) {
            this.traversal = traversal;
            this.start = 0;
            this.end = this.traversal.size()-1;
        }


        public TreeTraversal(ArrayList<Integer> traversal, int start, int end ) {
            this.start = start;
            this.end = end;
            this.traversal = traversal;
        }

        int get(int index){
            if(index > end) return this.traversal.get(end);
            if(index<start) return this.traversal.get(start);
            return this.traversal.get(index);
        }

        int find(int value){
            for(int i = start; i <= end; i++){
                if(this.traversal.get(i) == value) return i;
            }

            return -1;
        }

        TreeTraversal madeSubTreeByIndex(int start, int end){
            return new TreeTraversal(this.traversal, start, end);
        }

        TreeTraversal madeSubTreeByLength(int start, int length){
            return madeSubTreeByIndex(start, start + length);
        }
    }

    TreeNode buildTree(TreeTraversal inOrderTraversal, TreeTraversal postOrderTraversal){
        int currentValue = postOrderTraversal.get(postOrderTraversal.end); // get the last element of the post order array
        TreeNode currentNode = new TreeNode(currentValue);

        // Find the element in the inorder array
        int foundIndex = inOrderTraversal.find(currentValue);
        if(foundIndex == -1) return currentNode;
        TreeNode leftNode = buildTree(
                inOrderTraversal.madeSubTreeByIndex(inOrderTraversal.start, foundIndex-1),
                postOrderTraversal.madeSubTreeByLength(postOrderTraversal.start, )
        )

        // the left hand side of the inorder array is the left subtree


        // the right side of the inorder array is the right subtree

        return currentNode;
    }

    public TreeNode buildTree(ArrayList<Integer> inOrder, ArrayList<Integer> postOrder) {
        return buildTree(new TreeTraversal(inOrder), new TreeTraversal(postOrder));
    }
}
