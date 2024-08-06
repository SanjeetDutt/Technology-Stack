package in.sanjeetdutt.M004_Builder.P001_builder_config;

public class Client {

    public static void main(String[] args) {
        DatabaseConfigurationBuilder configuration = DatabaseConfigurationBuilder.getBuilder()
                .setDatabaseUrl("")
                .setPassword("")
                .setEnableCache(true)
                .setUsername("")
                .build()
        ;
    }
}
