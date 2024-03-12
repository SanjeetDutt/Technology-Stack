package in.sanjeetdutt.tree;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class LevelOrderGroupTraverse {

    List<List<Integer>> traverse(IterativeTraverse.Node root){

        Queue<IterativeTraverse.Node> nodeQueue = new LinkedList<>();
        nodeQueue.add(root);

        List<List<Integer>> result = new ArrayList<>();

        while (nodeQueue.size() > 0){
            List<Integer> subResult = new ArrayList<>();
            int size = nodeQueue.size();
            for(int i = 0; i < size; i++){
                IterativeTraverse.Node topEl = nodeQueue.remove();
                subResult.add(topEl.value);

                if(topEl.leftNode != null) nodeQueue.add(topEl.leftNode);

                if(topEl.rightNode != null) nodeQueue.add(topEl.rightNode);
            }

            System.out.println("SUB ARRAY : " + subResult);

            result.add(subResult);
        }

        return result;
    }
}
