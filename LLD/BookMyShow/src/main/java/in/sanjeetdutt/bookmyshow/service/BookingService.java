package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Booking;
import in.sanjeetdutt.bookmyshow.model.Theater;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingService extends BaseService<Booking> {

    public BookingService(GenericRepository<Booking> repository) {
        super(repository);
    }
}
