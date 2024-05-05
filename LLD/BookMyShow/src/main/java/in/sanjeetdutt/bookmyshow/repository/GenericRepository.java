package in.sanjeetdutt.bookmyshow.repository;

import in.sanjeetdutt.bookmyshow.model.BaseModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenericRepository<T extends BaseModel> extends CrudRepository<T, Long> {

}
