package in.sanjeetdutt.tree;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class IterativeTraverse {

    public static int[] preOrder(Node rootNode){
        Stack<Pair<Node, NodeStatus>> memoryStack = new Stack<>();
        List<Integer> result = new ArrayList<>();

        memoryStack.add(new Pair<>(rootNode, NodeStatus.ADDED_TO_STACK));

        while (memoryStack.size() > 0){

            Pair<Node, NodeStatus> nodePair = memoryStack.peek();
            Node node = nodePair.d1;
            NodeStatus status = nodePair.d2;

            switch (status){
                case ADDED_TO_STACK:
                    // So far Nothing done with the node
                    if(node.leftNode != null){
                        memoryStack.add(new Pair<>(node.leftNode, NodeStatus.ADDED_TO_STACK));
                    }
                    nodePair.d2 = NodeStatus.ACCESSED_LEFT_NODE;
                    break;

                case ACCESSED_LEFT_NODE:
                    // Pointer has done all operation with left node and now time is to print the node value
                    result.add(node.value);
                    nodePair.d2 = NodeStatus.ACCESSED_VALUE;
                    break;

                case ACCESSED_VALUE:
                    // Now we will move towards right node
                    if(node.rightNode != null){
                        memoryStack.add(new Pair<>(node.rightNode, NodeStatus.ADDED_TO_STACK));
                    }
                    nodePair.d2 = NodeStatus.ACCESSED_RIGHT_NODE;
                    break;

                case ACCESSED_RIGHT_NODE:
                    memoryStack.pop();
                    break;
            }

        }

        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    public static int[] inOrder(Node rootNode){
        Stack<Pair<Node, NodeStatus>> memoryStack = new Stack<>();
        List<Integer> result = new ArrayList<>();

        memoryStack.add(new Pair<>(rootNode, NodeStatus.ADDED_TO_STACK));

        while (memoryStack.size() > 0){

            Pair<Node, NodeStatus> nodePair = memoryStack.peek();
            Node node = nodePair.d1;
            NodeStatus status = nodePair.d2;

            switch (status){
                case ADDED_TO_STACK:
                    // We will access the value
                    result.add(node.value);
                    nodePair.d2 = NodeStatus.ACCESSED_VALUE;
                    break;

                case ACCESSED_VALUE:
                    // move towards left side
                    if(node.leftNode != null){
                        memoryStack.add(new Pair<>(node.leftNode, NodeStatus.ADDED_TO_STACK));
                    }
                    nodePair.d2 = NodeStatus.ACCESSED_LEFT_NODE;
                    break;

                case ACCESSED_LEFT_NODE:
                    // move towards right side
                    if(node.rightNode != null){
                        memoryStack.add(new Pair<>(node.rightNode, NodeStatus.ADDED_TO_STACK));
                    }
                    nodePair.d2 = NodeStatus.ACCESSED_RIGHT_NODE;
                    break;

                case ACCESSED_RIGHT_NODE:
                    // pop it
                    memoryStack.pop();
                    break;
            }

        }

        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    public static int[] postOrder(Node rootNode){
        Stack<Pair<Node, NodeStatus>> memoryStack = new Stack<>();
        List<Integer> result = new ArrayList<>();

        memoryStack.add(new Pair<>(rootNode, NodeStatus.ADDED_TO_STACK));

        while (memoryStack.size() > 0){

            Pair<Node, NodeStatus> nodePair = memoryStack.peek();
            Node node = nodePair.d1;
            NodeStatus status = nodePair.d2;

            switch (status){
                case ADDED_TO_STACK:
                    //move left
                    if(node.leftNode != null){
                        memoryStack.add(new Pair<>(node.leftNode, NodeStatus.ADDED_TO_STACK));
                    }
                    nodePair.d2 = NodeStatus.ACCESSED_LEFT_NODE;

                    break;

                case ACCESSED_LEFT_NODE:
                    // move towards right side
                    if(node.rightNode != null){
                        memoryStack.add(new Pair<>(node.rightNode, NodeStatus.ADDED_TO_STACK));
                    }
                    nodePair.d2 = NodeStatus.ACCESSED_RIGHT_NODE;
                    break;

                case ACCESSED_RIGHT_NODE:
                    // access value
                    result.add(node.value);
                    nodePair.d2 = NodeStatus.ACCESSED_VALUE;

                    break;

                case ACCESSED_VALUE:
                    //pop the value
                    memoryStack.pop();
                    break;
            }

        }

        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    enum NodeStatus{
        ADDED_TO_STACK,
        ACCESSED_LEFT_NODE,
        ACCESSED_VALUE,
        ACCESSED_RIGHT_NODE
    }

    static class Pair<Data1, Data2>{
        Data1 d1;
        Data2 d2;

        public Pair(Data1 d1, Data2 d2) {
            this.d1 = d1;
            this.d2 = d2;
        }
    }

    static class Node implements Comparable<Node>{

        Node leftNode;
        Node rightNode;
        int value;

        public Node(int value) {
            this.leftNode = null;
            this.rightNode = null;
            this.value = value;
        }

        public Node(int value, Node leftNode, Node rightNode) {
            this.leftNode = leftNode;
            this.rightNode = rightNode;
            this.value = value;
        }

        void addLeftNode(Node node){
            this.leftNode = node;
        }

        void addRightNode(Node node){
            this.rightNode = node;
        }

        @Override
        public int compareTo(Node o) {
            return this.value == o.value ? 1 : 0;
        }
    }


}
