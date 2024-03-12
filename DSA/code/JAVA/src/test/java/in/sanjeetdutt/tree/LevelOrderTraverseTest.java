package in.sanjeetdutt.tree;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LevelOrderTraverseTest {

    @Test
    void traverse() {
        int[] preOrder = new int[]{7,4,2,11,25,1,3,-3,9,45};
        int[] inOrder = new int[]{1,2,4,7,11,25,3,9,-3,45};

        BuildTreeFromDistinctValue buildTreeFromDistinctValue = new BuildTreeFromDistinctValue();
        IterativeTraverse.Node tree = buildTreeFromDistinctValue.build(inOrder, preOrder);

        LevelOrderTraverse levelOrderTraverse = new LevelOrderTraverse();
        int[] result = levelOrderTraverse.traverse(tree);

        assertArrayEquals(result, new int[]{1,2,3,4,11,9,7,25,-3,45});

    }
}
