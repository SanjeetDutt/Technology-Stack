package in.sanjeetdutt.M001_Concurency.P001_intro;

public class Client {
    public static void main(String[] args) {
        System.out.println("I am the main class");

        Adder adder = new Adder();
        Subtractor subtractor = new Subtractor();

        Thread threadAdded = new ScalerThread(adder);
        Thread threadSubtractor = new ScalerThread(subtractor);

        threadAdded.start();
        threadSubtractor.start();
    }
}
