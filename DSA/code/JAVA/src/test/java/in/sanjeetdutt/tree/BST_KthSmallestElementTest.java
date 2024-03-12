package in.sanjeetdutt.tree;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BST_KthSmallestElementTest {

    @Test
    void find() {
        IterativeTraverse.Node tree = new IterativeTraverse.Node(
                4,
                    new IterativeTraverse.Node(
                        0, new IterativeTraverse.Node(-1),new IterativeTraverse.Node(3)
                    ),
                    new IterativeTraverse.Node(
                            10,
                                new IterativeTraverse.Node(7, new IterativeTraverse.Node(6),new IterativeTraverse.Node(9)),
                                new IterativeTraverse.Node(15)
                    )

        );

        BST_KthSmallestElement kthSmallestElement = new BST_KthSmallestElement();

        assertEquals(kthSmallestElement.find(tree, 3),3);
        assertEquals(kthSmallestElement.find(tree, 5),6);
        assertEquals(kthSmallestElement.find(tree, 8),10);
    }
}
