package com.devsuperior.dsvendas.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository repository;
	
	@Autowired
	private SellerRepository sellerRepo;

	public double calculateTotalSales() {
        return repository.sumTotalSales();
    }
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable){
		
		sellerRepo.findAll(); // Eager loading to avoid LazyInitializationException
		// Lazy loading: when the entity is not loaded yet, it will be loaded when accessed.		
		Page<Sale> result = repository.findAll(pageable);
		return result.map(x -> new SaleDTO(x));	
	}

	@Transactional(readOnly = true)
	public List<SaleDTO> viewAll(){	
		List<Sale> result = repository.findAll();
        return result.stream().map(x -> new SaleDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<SaleSumDTO> amountGroupedBySeller(){
		return repository.amountGroupedBySeller();		
	}
	
	@Transactional(readOnly = true)
	public List<SaleSuccessDTO> successGroupedBySeller(){
		return repository.successGroupedBySeller();		
	}
	

}
