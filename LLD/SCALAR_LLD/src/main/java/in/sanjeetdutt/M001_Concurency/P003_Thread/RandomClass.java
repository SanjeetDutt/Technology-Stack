package in.sanjeetdutt.M001_Concurency.P003_Thread;

public class RandomClass implements Runnable{

    public RandomClass(){
        System.out.println("RANDOM CLASS CREATED...");
    }
    @Override
    public void run() {
        System.out.println("RUNNING RANDOM CLASS");
    }
}
