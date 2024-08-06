package in.sanjeetdutt.bookmyshow.service;

import in.sanjeetdutt.bookmyshow.model.BaseModel;
import in.sanjeetdutt.bookmyshow.repository.GenericRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public abstract class BaseService<Model extends BaseModel> {
    protected GenericRepository<Model> repository;

    public BaseService(GenericRepository<Model> repository) {
        this.repository = repository;
    }

    public List<Model> getAll(){
        List<Model> models = new ArrayList<>();
        repository.findAll().forEach(models::add);
        return models;
    }

    public void add(Model modelToAdd){
        repository.save(modelToAdd);
    }

    public void update(Model modelToUpdate){
        Optional<Model> optionalModel = repository.findById(modelToUpdate.getId());
        if(optionalModel.isEmpty()){
            throw new Error("Entity not found");
        }
        modelToUpdate.setModifiedAt(new Date());
        repository.save(modelToUpdate);
    }

    public Optional<Model> find(Long id){
        return repository.findById(id);
    }


}
