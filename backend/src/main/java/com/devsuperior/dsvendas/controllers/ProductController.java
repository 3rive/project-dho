
package com.devsuperior.dsvendas.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.devsuperior.dsvendas.entities.Product;
import com.devsuperior.dsvendas.repositories.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @PostMapping
    public Product save(@RequestParam("name") String name,
                        @RequestParam("price") Double price,
                        @RequestParam("quantity") Integer quantity,
                        @RequestParam("image") MultipartFile image) throws IOException {

        // Save the image to the server
        String imagePath = UPLOAD_DIR + image.getOriginalFilename();
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        image.transferTo(new File(imagePath));

        // Save product details to the database
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setImageUrl(imagePath);
        return productRepository.save(product);
    }
}
