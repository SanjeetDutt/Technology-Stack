package in.sanjeetdutt.tree;

import java.util.ArrayList;

/*
Problem Description
Find the lowest common ancestor in an unordered binary tree A, given two values, B and C, in the tree.

Lowest common ancestor: the lowest common ancestor (LCA) of two nodes and w in a tree or directed acyclic graph (DAG) is the lowest (i.e., deepest) node that has both v and w as descendants.



Problem Constraints
1 <= size of tree <= 100000

1 <= B, C <= 109



Input Format
First argument is head of tree A.

Second argument is integer B.

Third argument is integer C.



Output Format
Return the LCA.



Example Input
Input 1:


      1
     /  \
    2    3
B = 2
C = 3
Input 2:

      1
     /  \
    2    3
   / \
  4   5
B = 4
C = 5


Example Output
Output 1:

 1
Output 2:

 2


Example Explanation
Explanation 1:

 LCA is 1.
Explanation 2:

 LCA is 2.
 */
public class LowestCommonAncestor {
    public int lca(TreeNode node, int valA, int valB) {

        ArrayList<Integer> pathA =  new ArrayList<>();
        ArrayList<Integer> pathB =  new ArrayList<>();

        boolean hasValA = buildPathFromNodeToRoot(node, valA, pathA);
        boolean hasValB = buildPathFromNodeToRoot(node, valB, pathB);

        if(!hasValA || !hasValB){
            return -1;
        }

        int pointerA = pathA.size()-1;
        int pointerB = pathB.size()-1;

        int A = pathA.get(pointerA);
        int B = pathB.get(pointerB);
        int lastMatch = A;

        while (pointerA > -1 && pointerB > -1 && A == B){
            lastMatch = A;
            pointerA--;
            pointerB--;

            if(pointerA < 0 || pointerB < 0) return lastMatch;

            A = pathA.get(pointerA);
            B = pathB.get(pointerB);
        }

        return lastMatch;
    }

    public boolean buildPathFromNodeToRoot(TreeNode root, int nodeVal, ArrayList<Integer> list){
        if(root == null){
            return false;
        }

        if(     root.val == nodeVal ||
                buildPathFromNodeToRoot(root.left, nodeVal, list) ||
                buildPathFromNodeToRoot(root.right, nodeVal, list)
        ){
            list.add(root.val);
            return true;
        }

        return false;
    }
}
