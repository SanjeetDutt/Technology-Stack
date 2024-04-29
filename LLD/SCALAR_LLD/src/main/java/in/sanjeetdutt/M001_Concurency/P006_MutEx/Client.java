package in.sanjeetdutt.M001_Concurency.P006_MutEx;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Client {

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        Value value = new Value();
        Lock lock = new ReentrantLock();

        for(int i = 0; i < 100; i++){
            Adder adder = new Adder(value, lock, i);
            Subtract subtract = new Subtract(value, lock, i);
            executorService.submit(adder);
            executorService.submit(subtract);
        }

        executorService.shutdown();
        System.out.println("FINAL VALUE : " + value.value);
    }
}
