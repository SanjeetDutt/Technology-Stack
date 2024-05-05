package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Theater;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class TheaterService extends BaseService<Theater> {

    public TheaterService(GenericRepository<Theater> theaterRepository) {
        super(theaterRepository);
    }
}
