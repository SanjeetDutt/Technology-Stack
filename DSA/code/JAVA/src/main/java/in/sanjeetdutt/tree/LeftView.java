package in.sanjeetdutt.tree;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class LeftView {

    List<Integer> find(IterativeTraverse.Node root){

        Queue<IterativeTraverse.Node> nodeQueue = new LinkedList<>();
        nodeQueue.add(root);

        List<Integer> result = new ArrayList<>();
        int currentIndex = 0;

        while (nodeQueue.size() > 0){
            int size = nodeQueue.size();
            Integer val = null;

            for(int i = 0; i < size; i++){
                IterativeTraverse.Node topEl = nodeQueue.remove();

                if(val == null) val = topEl.value;

                if(topEl.leftNode != null) nodeQueue.add(topEl.leftNode);

                if(topEl.rightNode != null) nodeQueue.add(topEl.rightNode);
            }

            result.add(val);

        }

        return result;
    }
}
