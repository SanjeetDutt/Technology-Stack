package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.SeatType;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class SeatTypeService extends BaseService<SeatType> {

    public SeatTypeService(GenericRepository<SeatType> repository) {
        super(repository);
    }
}
