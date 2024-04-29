package in.sanjeetdutt.M002_Design_Pattern.P004_Factory;

public class MongoDB implements Database{
    @Override
    public Query createQuery() {
        return new NoSqlQuery();
    }
}
