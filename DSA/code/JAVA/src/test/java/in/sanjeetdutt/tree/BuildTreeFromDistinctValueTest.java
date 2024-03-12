package in.sanjeetdutt.tree;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BuildTreeFromDistinctValueTest {

    @Test
    void build() {

        int[] preOrderArray = new int[]{8,6,2,11,16,10,12,4,14,18,9,15};
        int[] inOrderArray = new int[]{11,2,16,6,10,12,8,14,18,4,9,15};

        BuildTreeFromDistinctValue buildTreeFromDistinctValue = new BuildTreeFromDistinctValue();

        IterativeTraverse.Node tree = buildTreeFromDistinctValue.build(preOrderArray, inOrderArray);

        int[] preOder = IterativeTraverse.inOrder(tree); // Wrong function name given
        int[] inOrder = IterativeTraverse.preOrder(tree);// Wrong function name given

        assertArrayEquals(preOrderArray, preOder);
        assertArrayEquals(inOrderArray, inOrder);


    }
}
