package in.sanjeetdutt.M001_Concurency.P001_intro;

public class Subtractor implements Runnable {
    @Override
    public void run() {
        System.out.println("I am the Subtractor class");
    }
}
