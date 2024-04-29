package in.sanjeetdutt.M002_Design_Pattern.P004_Factory;

public class Mysql implements Database{
    @Override
    public Query createQuery() {
        return new SqlQuery();
    }
}
