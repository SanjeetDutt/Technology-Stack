package in.sanjeetdutt.tree;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LeftViewTest {

    @Test
    void find() {
        int[] preOrder = new int[]{7,4,2,11,25,1,3,-3,9,45};
        int[] inOrder = new int[]{1,2,4,7,11,25,3,9,-3,45};

        BuildTreeFromDistinctValue buildTreeFromDistinctValue = new BuildTreeFromDistinctValue();
        IterativeTraverse.Node tree = buildTreeFromDistinctValue.build(inOrder, preOrder);

        LeftView leftView = new LeftView();
        List<Integer> result =  leftView.find(tree);

        assertArrayEquals(result.stream().mapToInt(Integer::intValue).toArray() , new int[]{1,2,4,7});

    }
}
