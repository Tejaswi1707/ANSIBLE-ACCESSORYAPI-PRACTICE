package com.klef.practice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.practice.model.Accessory;
import com.klef.practice.repository.AccessoryRepository;

@Service
public class AccessoryServiceImpl implements AccessoryService {

    @Autowired
    private AccessoryRepository repository;

    @Override
    public List<Accessory> viewAllAccessories() {
        return repository.findAll();
    }

    @Override
    public Accessory getAccessoryById(int id) {
        Optional<Accessory> obj = repository.findById(id);
        return obj.orElse(null);
    }

    @Override
    public String addAccessory(Accessory acc) {
        repository.save(acc);
        return "Accessory Added Successfully";
    }

    @Override
    public String updateAccessory(Accessory acc) {
        Optional<Accessory> obj = repository.findById(acc.getId());
        if (obj.isPresent()) {
            repository.save(acc);
            return "Accessory Updated Successfully";
        } else {
            return "Accessory ID Not Found";
        }
    }

    @Override
    public String deleteAccessory(int id) {
        Optional<Accessory> obj = repository.findById(id);
        if (obj.isPresent()) {
            repository.delete(obj.get());
            return "Accessory Deleted Successfully";
        } else {
            return "Accessory ID Not Found";
        }
    }
}
