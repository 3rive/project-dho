package com.devsuperior.dsvendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dsvendas.entities.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT s FROM Seller s JOIN FETCH s.sales")
    List<Seller> findTopSellers();
}
