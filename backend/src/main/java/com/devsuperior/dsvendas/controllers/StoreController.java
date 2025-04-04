package com.devsuperior.dsvendas.controllers;


import com.devsuperior.dsvendas.entities.Store;
import com.devsuperior.dsvendas.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class StoreController {

    @Autowired
    private StoreRepository storeRepository;

    // Get all stores
    @GetMapping
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    // Add a new store
    @PostMapping
    public ResponseEntity<Store> addStore(@RequestBody Store store) {
        Store savedStore = storeRepository.save(store);
        return ResponseEntity.ok(savedStore);
    }

    // Delete a store
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        storeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}