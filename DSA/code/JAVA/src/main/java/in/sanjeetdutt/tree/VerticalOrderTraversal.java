package in.sanjeetdutt.tree;

import java.util.*;

public class VerticalOrderTraversal {

    public ArrayList<ArrayList<Integer>> verticalOrderTraversal(TreeNode A) {

        Queue<Pair<Integer, TreeNode>> nodeQueue = new LinkedList<>();
        TreeMap<Integer, ArrayList<Integer>> sortedMap = new TreeMap<>();

        nodeQueue.add(new Pair<>(0,A));

        while (nodeQueue.size() > 0){
            Pair<Integer, TreeNode> nodePair = nodeQueue.remove();

            int currentIndex = nodePair.data1;
            TreeNode currentNode = nodePair.data2;

            if(currentNode.left != null) nodeQueue.add(new Pair<>(currentIndex-1, currentNode.left));

            if(currentNode.right != null) nodeQueue.add(new Pair<>(currentIndex + 1, currentNode.right));

            if(sortedMap.containsKey(currentIndex)){
                sortedMap.get(currentIndex).add(currentNode.val);
            } else {
                ArrayList<Integer> list = new ArrayList<>();
                list.add(currentNode.val);
                sortedMap.put(currentIndex, list);
            }
        }

        return new ArrayList<>(sortedMap.values());

    }

}

class Pair<d1,d2>{
    d1 data1;
    d2 data2;

    public Pair(d1 data1, d2 data2) {
        this.data1 = data1;
        this.data2 = data2;
    }
}
