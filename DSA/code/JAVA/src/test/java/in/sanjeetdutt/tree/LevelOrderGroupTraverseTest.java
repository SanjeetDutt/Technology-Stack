package in.sanjeetdutt.tree;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LevelOrderGroupTraverseTest {

    @Test
    void traverse() {
        int[] preOrder = new int[]{7,4,2,11,25,1,3,-3,9,45};
        int[] inOrder = new int[]{1,2,4,7,11,25,3,9,-3,45};

        BuildTreeFromDistinctValue buildTreeFromDistinctValue = new BuildTreeFromDistinctValue();
        IterativeTraverse.Node tree = buildTreeFromDistinctValue.build(inOrder, preOrder);

        LevelOrderGroupTraverse levelOrderGroupTraverse = new LevelOrderGroupTraverse();
        List<List<Integer>> result =  levelOrderGroupTraverse.traverse(tree);

        assertArrayEquals(toArray(result.get(0)) , new int[]{1});
        assertArrayEquals(toArray(result.get(1)) , new int[]{2,3});
        assertArrayEquals(toArray(result.get(2)) , new int[]{4,11,9});
        assertArrayEquals(toArray(result.get(3)) , new int[]{7,25,-3,45});
    }

    int[] toArray (List<Integer> arr){
        return arr.stream().mapToInt(Integer::intValue).toArray();
    }
}
