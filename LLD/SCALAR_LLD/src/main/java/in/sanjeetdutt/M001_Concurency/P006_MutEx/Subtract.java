package in.sanjeetdutt.M001_Concurency.P006_MutEx;

import java.util.concurrent.locks.Lock;

public class Subtract implements Runnable{
    Value value;
    Lock lock;
    int valDec;

    public Subtract(Value value, Lock lock, int valDec) {
        this.value = value;
        this.lock = lock;
        this.valDec = valDec;
    }

    @Override
    public void run() {
        lock.lock();
        System.out.println("----------SUBTRACTING START");
        this.value.value -= valDec;
        System.out.println("----------SUBTRACTING COMPLETED----------");
        lock.unlock();
    }
}
