package in.sanjeetdutt.M001_Concurency.P004_Thread_Pooling;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Client {
    public static void main(String[] args) {
        System.out.println("STARTING APPLICATION...");
        RunnableClass randomClass = new RunnableClass();

        ExecutorService executorService = Executors.newFixedThreadPool(5);
        executorService.submit(randomClass);
        executorService.shutdown();

        System.out.println("STOPPING APPLICATION...");
    }
}
