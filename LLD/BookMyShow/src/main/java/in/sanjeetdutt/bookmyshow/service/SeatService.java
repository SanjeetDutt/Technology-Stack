package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Screen;
import in.sanjeetdutt.bookmyshow.model.Seat;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class SeatService extends BaseService<Seat> {

    public SeatService(GenericRepository<Seat> repository) {
        super(repository);
    }
}
