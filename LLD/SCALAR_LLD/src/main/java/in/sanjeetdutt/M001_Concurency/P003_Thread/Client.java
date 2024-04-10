package in.sanjeetdutt.M001_Concurency.P003_Thread;

public class Client {
    public static void main(String[] args) {
        System.out.println("Application stating...");
        RandomClass randomClass = new RandomClass();

        Thread thread = new Thread(randomClass);
        thread.start();

        System.out.println("Application stopped...");
    }
}
