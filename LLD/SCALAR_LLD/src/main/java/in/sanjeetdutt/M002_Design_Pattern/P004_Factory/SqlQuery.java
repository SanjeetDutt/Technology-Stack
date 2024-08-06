package in.sanjeetdutt.M002_Design_Pattern.P004_Factory;

public class SqlQuery implements Query{

    @Override
    public void execute() {
        System.out.println("EXECUTING SQL QUERY");
    }
}
