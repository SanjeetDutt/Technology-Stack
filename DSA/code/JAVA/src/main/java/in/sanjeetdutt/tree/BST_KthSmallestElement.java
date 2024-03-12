package in.sanjeetdutt.tree;

import in.sanjeetdutt.tree.IterativeTraverse.Node;

public class BST_KthSmallestElement {

    int counter = 0;
    int ans = 0;

    int find(Node root, int k){

        counter = 0;
        ans = 0;
        inOrderTraverse(root, k);
        return ans;
    }

    private void inOrderTraverse(Node root, int k) {
        if(root == null) return;

        inOrderTraverse(root.leftNode, k);

        counter++;
        if(counter == k) ans = root.value;

        inOrderTraverse(root.rightNode, k);
    }
}
