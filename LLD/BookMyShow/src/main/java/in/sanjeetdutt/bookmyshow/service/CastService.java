package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Cast;
import in.sanjeetdutt.bookmyshow.model.Theater;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class CastService extends BaseService<Cast> {

    public CastService(GenericRepository<Cast> repository) {
        super(repository);
    }
}
