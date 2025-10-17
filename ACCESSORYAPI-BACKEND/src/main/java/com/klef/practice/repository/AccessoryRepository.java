package com.klef.practice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.practice.model.Accessory;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Integer> {
}
