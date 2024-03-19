package in.sanjeetdutt.M001_Concurency.P002_Executors;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(100);

        Node root = new Node(1);
        Node l1 = new Node(2);
        Node l2 = new Node(3);
        Node l3 = new Node(4);
        Node l4 = new Node(5);
        Node l5 = new Node(6);
        Node l6 = new Node(7);
        Node l7 = new Node(8);

        root.left = l1;
        l1.left = l2;
        l2.left = l3;
        l3.left = l4;
        l4.left = l5;
        l5.left = l6;
        l6.left = l7;

        TreeSizeCalculator treeSizeCalculator = new TreeSizeCalculator(root, executorService);
        Future<Integer> treeSize = executorService.submit(treeSizeCalculator);
        System.out.println(treeSize.get());

    }
}
