package com.devsuperior.dsvendas.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SellerService {
    
    @Autowired
    private SellerRepository repository;
    
    // Fetch all sellers
    public List<SellerDTO> findAll() {
        List<Seller> result = repository.findAll();
        return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList());
    }

    // Add a new store
    public SellerDTO addStore(SellerDTO dto) {
        Seller entity = new Seller();
        entity.setName(dto.getName());
        entity.setLocation(dto.getLocation());
        entity.setAddress(dto.getAddress());
        entity.setPhonenumber(dto.getPhoneNumber());
        entity = repository.save(entity);
        return new SellerDTO(entity);
    }

    public List<SellerDTO> findTopSellers() {
        return repository.findTopSellers().stream()
                .map(seller -> new SellerDTO(seller.getId(), seller.getName(), seller.getSales().stream()
                        .mapToDouble(Sale::getAmount).sum()))
                .collect(Collectors.toList());
    }

    public void deleteSeller(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Store with ID " + id + " does not exist.");
        }
    }
}