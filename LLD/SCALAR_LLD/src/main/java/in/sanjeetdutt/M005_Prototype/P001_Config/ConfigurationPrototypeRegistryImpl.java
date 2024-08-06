package in.sanjeetdutt.M005_Prototype.P001_Config;

import java.util.HashMap;
import java.util.Map;

public class ConfigurationPrototypeRegistryImpl implements ConfigurationPrototypeRegistry{
    private final Map<ConfigurationType, Configuration> configurationMap;

    public ConfigurationPrototypeRegistryImpl() {
        this.configurationMap = new HashMap<>();
    }

    @Override
    public void addPrototype(Configuration configuration) {
        configurationMap.put(configuration.getType(), configuration);
    }

    @Override
    public Configuration getPrototype(ConfigurationType type) {
        return configurationMap.get(type);
    }

    @Override
    public Configuration clone(ConfigurationType type) {
        return getPrototype(type).cloneObject();
    }
}
