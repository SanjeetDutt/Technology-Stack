package in.sanjeetdutt.multiThreadedMergeSort;

import javax.xml.stream.XMLInputFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Sorter implements Callable<List<Integer>> {

    private List<Integer> arrayToSort;
    private ExecutorService executorService;

    public Sorter(List<Integer> list, ExecutorService executorService) {
        arrayToSort = list;
        this.executorService = executorService;
    }

    @Override
    public List<Integer> call() throws Exception {

        if(arrayToSort.size() <= 1) return arrayToSort;

        int mid = arrayToSort.size()/2;

        //create 2 array list
        List<Integer> leftArray = new ArrayList<>();
        List<Integer> rightArray = new ArrayList<>();

        //Append half in left
        for (int i = 0 ; i< mid; i++)
            leftArray.add(arrayToSort.get(i));

        //Append another half in right
        for (int i = mid ; i< arrayToSort.size(); i++)
            rightArray.add(arrayToSort.get(i));

        // Create a sorted class that can be called in the thread pool
        Sorter sorterLeft = new Sorter(leftArray, executorService);
        Sorter sorterRight = new Sorter(rightArray, executorService);

        // Run the task and put the result back in the vars
        System.out.println("Starting new thread for left sort");
        Future<List<Integer>> leftSortedFuture = executorService.submit(sorterLeft);
        System.out.println("Starting new thread for right sort");
        Future<List<Integer>> rightSortedFuture = executorService.submit(sorterRight);

        System.out.println("Waiting to get result of left sort");
        leftArray = leftSortedFuture.get(); // get() will wait until thread return a result
        System.out.println("Waiting to get result of right sort");
        rightArray = rightSortedFuture.get();

        System.out.println("MERING Arrays");
        // merge the sorted array
        int leftPointer = 0;
        int rightPointer = 0;
        int pointer = 0;

        while(leftPointer < leftArray.size() && rightPointer < rightArray.size()){
            int left = leftArray.get(leftPointer);
            int right = rightArray.get(rightPointer);
            if(left < right){
                arrayToSort.set(pointer, left);
                leftPointer++;
                pointer++;
            }else {
                arrayToSort.set(pointer, right);
                rightPointer++;
                pointer++;
            }
        }


        while(leftPointer < leftArray.size()){
            int left = leftArray.get(leftPointer);
            arrayToSort.set(pointer, left);
            leftPointer++;
            pointer++;
        }


        while(rightPointer < rightArray.size()){
            int right = rightArray.get(rightPointer);
            arrayToSort.set(pointer, right);
            rightPointer++;
            pointer++;
        }
        //return the result
        return arrayToSort;
    }
}
