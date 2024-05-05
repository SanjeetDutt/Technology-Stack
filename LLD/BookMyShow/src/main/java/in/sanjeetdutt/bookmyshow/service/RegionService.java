package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Region;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class RegionService extends BaseService<Region> {

    public RegionService(GenericRepository<Region> repository) {
        super(repository);
    }

    public void addRegion(String regionName){
        Region region = Region.builder().name(regionName).build();
        super.add(region);
    }
}
