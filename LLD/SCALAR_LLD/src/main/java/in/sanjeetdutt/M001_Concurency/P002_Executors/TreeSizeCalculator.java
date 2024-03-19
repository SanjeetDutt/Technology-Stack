package in.sanjeetdutt.M001_Concurency.P002_Executors;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

public class TreeSizeCalculator implements Callable<Integer> {
    Node root;
    ExecutorService executorService;
    public TreeSizeCalculator(Node BTNode, ExecutorService executorService){
        this.root = BTNode;
        this.executorService = executorService;
    }

    @Override
    public Integer call() throws Exception {
        if(root == null) return 0;

        System.out.println("CALLING");

        TreeSizeCalculator left = new TreeSizeCalculator(root.left, this.executorService);
        TreeSizeCalculator right = new TreeSizeCalculator(root.right, this.executorService);

        Future<Integer> leftTreeSize = executorService.submit(left);
        Future<Integer> rightTreeSize = executorService.submit(right);

        return leftTreeSize.get() + rightTreeSize.get() + 1;
    }
}
