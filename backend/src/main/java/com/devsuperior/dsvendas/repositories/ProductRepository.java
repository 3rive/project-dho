package com.devsuperior.dsvendas.repositories;

import com.devsuperior.dsvendas.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
