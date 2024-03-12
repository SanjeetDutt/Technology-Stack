package in.sanjeetdutt.tree;

import java.util.*;

// Given a Binary tree print element in level order Left to right
public class LevelOrderTraverse {

    int[] traverse(IterativeTraverse.Node root){

        Queue<IterativeTraverse.Node> nodeQueue = new LinkedList<>();
        System.out.println("ADDING in QUEUE" + root.value);
        nodeQueue.add(root);
        List<Integer> result = new ArrayList<>();

        while (nodeQueue.size() > 0){
            printQueue(nodeQueue);

            IterativeTraverse.Node topEl = nodeQueue.remove();
            System.out.println("REMOVING " + topEl.value);
            result.add(topEl.value);

            if(topEl.leftNode != null){
                System.out.println("ADDING IN QUEUE " + topEl.leftNode.value);
                nodeQueue.add(topEl.leftNode);
            }

            if(topEl.rightNode != null){
                System.out.println("ADDING IN QUEUE" + topEl.rightNode.value);
                nodeQueue.add(topEl.rightNode);
            }
        }

        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    private void printQueue(Queue<IterativeTraverse.Node> nodeQueue) {
        int[] result = new int[nodeQueue.size()];
        int i = 0;
        for(IterativeTraverse.Node n: nodeQueue){
            result[i] = n.value;
            i++;
        }
        System.out.println("::::::::::::::::::::::::::::::::::::::::::::::::::QUEUE " + Arrays.toString(result));
    }
}
