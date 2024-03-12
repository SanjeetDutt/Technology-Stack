package in.sanjeetdutt.tree;

public class NextPointerBinaryTree {
    public class Solution {
        public void connect(TreeLinkNode root) {
            nextPointer( root );
        }

        TreeLinkNode prev = null;
        void nextPointer( TreeLinkNode root )
        {
            if( root == null ) return;

            if( prev != null )
                root.next = prev;

            prev = root.right;
            nextPointer( root.left );

            if( root.next != null )
                prev = root.next.left;

            nextPointer( root.right );
        }
    }
}


//Definition for binary tree with next pointer.
 class TreeLinkNode {
    int val;
    TreeLinkNode left, right, next;
    TreeLinkNode(int x) { val = x; }
}
