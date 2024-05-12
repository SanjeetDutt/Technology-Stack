package in.sanjeetdutt.M003_Singleton.P001_file_based_config;

public class FileBasedConfigurationManagerImpl extends FileBasedConfigurationManager {

    private static FileBasedConfigurationManager fileBasedConfigurationManager;

    FileBasedConfigurationManagerImpl() {
        super();
    }

    //Function to get the valid instance
    //means:
    // if instance exists return the current instance
    // if not return the new instance
    public static FileBasedConfigurationManager getInstance() {

        if(fileBasedConfigurationManager == null){
            synchronized (FileBasedConfigurationManager.class){
                if(fileBasedConfigurationManager == null){
                    fileBasedConfigurationManager = new FileBasedConfigurationManagerImpl();
                }
            }
        }

        return fileBasedConfigurationManager;
    }

    // reset the instant to null
    public static void resetInstance() {
        fileBasedConfigurationManager = null;
    }

    @Override
    public void setConfiguration(String key, String value) {
        properties.put(key, value);
    }

    @Override
    public String getConfiguration(String key) {
        return properties.getProperty(key);
    }

    @Override
    public <T> T getConfiguration(String key, Class<T> type) {
        String config = getConfiguration(key);

        if(config == null) return null;

        return fileBasedConfigurationManager.convert(config, type);
    }

    @Override
    public <T> void setConfiguration(String key, T value) {
        properties.put(key, value);}

    @Override
    public void removeConfiguration(String key) {
        properties.remove(key);
    }

    @Override
    public void clear() {
        properties.clear();
    }



}
