package in.sanjeetdutt.M001_Concurency.P004_Thread_Pooling;

public class RunnableClass implements Runnable{

    RunnableClass(){
        System.out.println("RUNNABLE CLASS CREATED....");
    }

    @Override
    public void run() {
        System.out.println("RUNNABLE CLASS RUNNING....");
    }
}
