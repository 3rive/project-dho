package com.devsuperior.dsvendas.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsvendas.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
}