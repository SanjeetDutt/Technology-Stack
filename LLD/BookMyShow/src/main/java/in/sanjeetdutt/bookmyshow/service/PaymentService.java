package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Movie;
import in.sanjeetdutt.bookmyshow.model.Payment;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService extends BaseService<Payment> {

    public PaymentService(GenericRepository<Payment> repository) {
        super(repository);
    }
}
