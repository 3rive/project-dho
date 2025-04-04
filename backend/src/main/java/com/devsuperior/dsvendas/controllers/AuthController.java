package com.devsuperior.dsvendas.controllers;

import com.devsuperior.dsvendas.entities.User;
import com.devsuperior.dsvendas.repositories.UserRepository;
import com.devsuperior.dsvendas.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            String token = JwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok().body(new AuthResponse(token));
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}