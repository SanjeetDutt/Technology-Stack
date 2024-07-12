package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.Cast;
import in.sanjeetdutt.bookmyshow.model.Movie;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;
import org.springframework.stereotype.Service;

@Service
public class MovieService extends BaseService<Movie> {

    public MovieService(GenericRepository<Movie> repository) {
        super(repository);
    }
}
