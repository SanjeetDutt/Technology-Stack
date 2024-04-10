package in.sanjeetdutt.M001_Concurency.P005_Callable;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Client {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        System.out.println("APPLICATION STARTING....");

        AsyncClass asyncClass = new AsyncClass();

        ExecutorService executorService = Executors.newFixedThreadPool(1);

        Future<Double> futureRandomNumber = executorService.submit(asyncClass);
        executorService.shutdown();
        Double randomNumber = futureRandomNumber.get();
        System.out.println("FUTURE RANDOM NUMBER IS : " + randomNumber);

        System.out.println("APPLICATION STOPPED....");
    }
}
