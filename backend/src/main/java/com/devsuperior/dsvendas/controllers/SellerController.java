package com.devsuperior.dsvendas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.services.SellerService;

@RestController
@RequestMapping(value = "/sellers")
public class SellerController {
	
	@Autowired
	private SellerService service;

	@PostMapping
	public ResponseEntity<SellerDTO> addSeller(@RequestBody SellerDTO dto) {
		SellerDTO newSeller = service.addStore(dto);
		return ResponseEntity.ok(newSeller);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteSeller(@PathVariable Long id) {
		service.deleteSeller(id);
		return ResponseEntity.noContent().build();
	}
	@GetMapping
	public ResponseEntity<List<SellerDTO>> findAll() {
		List<SellerDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}

    @GetMapping("/top")
    public ResponseEntity<List<SellerDTO>> getTopSellers() {
        List<SellerDTO> topSellers = service.findTopSellers();
        return ResponseEntity.ok(topSellers);
    }
}
