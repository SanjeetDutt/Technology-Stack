package in.sanjeetdutt.M001_Concurency.P005_Callable;

import java.util.concurrent.Callable;

public class AsyncClass implements Callable<Double> {

    public AsyncClass() {
        System.out.println("ASYNC CLASS CREATED");
    }

    @Override
    public Double call() throws Exception {
        System.out.println("RUNNING ASYNC CLASS");
        Thread.sleep(5000);
        Double number = Math.random();
        System.out.println("SYSTEM GENERATED RANDOM NUMBER = " + number);
        return number;
    }
}
