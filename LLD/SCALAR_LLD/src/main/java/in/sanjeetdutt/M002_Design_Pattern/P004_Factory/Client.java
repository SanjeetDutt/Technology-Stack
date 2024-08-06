package in.sanjeetdutt.M002_Design_Pattern.P004_Factory;

public class Client {
    public static void main(String[] args) {
        Database database = new Mysql();
        Query query = database.createQuery();
        query.execute();
    }
}
