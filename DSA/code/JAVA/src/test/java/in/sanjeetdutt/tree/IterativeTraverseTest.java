package in.sanjeetdutt.tree;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import in.sanjeetdutt.tree.IterativeTraverse.*;

import static org.junit.jupiter.api.Assertions.*;

class IterativeTraverseTest {

    Node rootNode = new Node(5);

    @BeforeEach
    void setUp() {
        Node node12 = new Node(12);
        Node node6 = new Node(6);
        Node node9 = new Node(9);
        Node nodeM1 = new Node(-1);

        rootNode.addLeftNode(node12);
        rootNode.addRightNode(node6);

        node12.addRightNode(node9);
        node6.addLeftNode(nodeM1);
    }

    @Test
    void preOrderTest() {
        int[] result = IterativeTraverse.preOrder(rootNode);
        assertArrayEquals(result, new int[]{12,9,5,-1,6});
    }

    @Test
    void inOrderTest() {
        int[] result = IterativeTraverse.inOrder(rootNode);
        assertArrayEquals(result, new int[]{5,12,9,6,-1});
    }

    @Test
    void postOrderTest() {
        int[] result = IterativeTraverse.postOrder(rootNode);
        assertArrayEquals(result, new int[]{9,12,-1,6,5});
    }
}
