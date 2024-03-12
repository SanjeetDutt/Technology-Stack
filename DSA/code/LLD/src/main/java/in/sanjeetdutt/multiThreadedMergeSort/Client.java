package in.sanjeetdutt.multiThreadedMergeSort;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.*;

public class Client {

    public static void main(String[] args) {

        ExecutorService executorService = Executors.newCachedThreadPool();
        Sorter sorter = new Sorter(Arrays.asList(9,8,7,5,6,2,4,6,2,4,6,2,54,26,48,1,5,65,2,15,952,4,84,2,4,95,2,9,71,81,4145), executorService);

        Future<List<Integer>> result = executorService.submit(sorter);

        try{
            List<Integer> list = result.get();
            System.out.println(list);
        } catch (Exception ex){
            System.out.println(ex.getMessage());
        }

    }


}
