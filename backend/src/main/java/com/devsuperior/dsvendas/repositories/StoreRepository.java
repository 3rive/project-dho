package com.devsuperior.dsvendas.repositories;

import com.devsuperior.dsvendas.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}