package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.SeatType;
import in.sanjeetdutt.bookmyshow.model.Show;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class ShowService extends BaseService<Show> {

    public ShowService(GenericRepository<Show> repository) {
        super(repository);
    }
}
