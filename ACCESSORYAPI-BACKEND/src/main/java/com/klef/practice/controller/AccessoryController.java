package com.klef.practice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.practice.model.Accessory;
import com.klef.practice.service.AccessoryService;

@RestController
@RequestMapping("/accessoryapi")
@CrossOrigin("*")
public class AccessoryController {

    @Autowired
    private AccessoryService service;

    @GetMapping("/")
    public String home() {
        return "Accessory API Home";
    }

    @GetMapping("/all")
    public List<Accessory> viewAllAccessories() {
        return service.viewAllAccessories();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Accessory acc = service.getAccessoryById(id);
        if (acc != null)
            return ResponseEntity.ok(acc);
        else
            return ResponseEntity.status(404).body("Accessory with ID " + id + " not found");
    }

    @PostMapping("/add")
    public String addAccessory(@RequestBody Accessory acc) {
        return service.addAccessory(acc);
    }

    @PutMapping("/update")
    public String updateAccessory(@RequestBody Accessory acc) {
        return service.updateAccessory(acc);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAccessory(@PathVariable int id) {
        return service.deleteAccessory(id);
    }
}
