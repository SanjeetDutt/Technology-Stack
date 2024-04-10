package in.sanjeetdutt.M001_Concurency.P007_synchronised_function;

public class Client {
    public static void main(String[] args) {
        //EXECUTOR SERVICES
    }

    void functionA (Integer i){
        synchronized (i){
            System.out.println("VAL OF I IS : " + i);
        }
    }

    void functionB (Integer i, Integer j){
        synchronized (i){
            synchronized (j){
                System.out.println("VAL OF I,J IS : " + i + ","+j);
            }
        }
    }
}
