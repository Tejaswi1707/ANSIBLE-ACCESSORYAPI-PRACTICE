package com.klef.practice.service;

import java.util.List;
import com.klef.practice.model.Accessory;

public interface AccessoryService {
    List<Accessory> viewAllAccessories();
    Accessory getAccessoryById(int id);
    String addAccessory(Accessory acc);
    String updateAccessory(Accessory acc);
    String deleteAccessory(int id);
}
