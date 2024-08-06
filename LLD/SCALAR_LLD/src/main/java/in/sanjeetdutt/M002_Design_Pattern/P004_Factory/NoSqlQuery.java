package in.sanjeetdutt.M002_Design_Pattern.P004_Factory;

public class NoSqlQuery implements Query{
    @Override
    public void execute() {
        System.out.println("EXECUTING NO_SQL QUERY");
    }
}
