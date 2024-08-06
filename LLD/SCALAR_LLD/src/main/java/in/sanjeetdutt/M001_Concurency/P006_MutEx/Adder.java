package in.sanjeetdutt.M001_Concurency.P006_MutEx;

import java.util.concurrent.locks.Lock;

public class Adder implements Runnable{
    Value value;
    Lock lock;
    int valInc;

    public Adder(Value value, Lock lock, int valInc) {
        this.value = value;
        this.lock = lock;
        this.valInc = valInc;
    }

    @Override
    public void run() {
        lock.lock();
        System.out.println("+++ADDING START");
        this.value.value += valInc;
        System.out.println("+++ADDING COMPLETE+++");
        lock.unlock();
    }
}
