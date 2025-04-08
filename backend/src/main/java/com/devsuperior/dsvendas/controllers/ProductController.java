
package com.devsuperior.dsvendas.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.devsuperior.dsvendas.entities.Product;
import com.devsuperior.dsvendas.repositories.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @PostMapping
    public Product save(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
