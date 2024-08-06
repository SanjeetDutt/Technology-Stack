package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Payment;
import in.sanjeetdutt.bookmyshow.model.Screen;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class ScreenService extends BaseService<Screen> {

    public ScreenService(GenericRepository<Screen> repository) {
        super(repository);
    }
}
