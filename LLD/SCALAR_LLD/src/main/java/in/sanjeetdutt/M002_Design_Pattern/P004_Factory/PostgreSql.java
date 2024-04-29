package in.sanjeetdutt.M002_Design_Pattern.P004_Factory;

public class PostgreSql implements Database{
    @Override
    public Query createQuery() {
        return new SqlQuery();
    }
}
