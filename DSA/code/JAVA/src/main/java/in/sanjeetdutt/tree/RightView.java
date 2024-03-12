package in.sanjeetdutt.tree;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class RightView {

    List<Integer> find(IterativeTraverse.Node root){

        Queue<IterativeTraverse.Node> nodeQueue = new LinkedList<>();
        nodeQueue.add(root);

        List<Integer> result = new ArrayList<>();

        while (nodeQueue.size() > 0){
            int size = nodeQueue.size();
            result.add(null);

            for(int i = 0; i < size; i++){
                IterativeTraverse.Node topEl = nodeQueue.remove();

                result.set(result.size()-1, topEl.value);

                if(topEl.leftNode != null) nodeQueue.add(topEl.leftNode);

                if(topEl.rightNode != null) nodeQueue.add(topEl.rightNode);
            }

        }

        return result;
    }
}
