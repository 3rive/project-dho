package com.devsuperior.dsvendas.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Product;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.ProductRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;
import com.devsuperior.dsvendas.services.SaleService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService service;

	@Autowired
	private SellerRepository sellerRepository;

    @Autowired
    private ProductRepository productRepository;
	
	
	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable) {
		Page<SaleDTO> list = service.findAll(pageable);
		
		return ResponseEntity.ok(list);
	}

@PostMapping("/add")
public ResponseEntity<SaleDTO> addSale(@RequestBody Map<String, Object> payload) {
    System.out.println("Payload: " + payload); // Debugging: Log the payload

    // Extract sellerId from the payload
    Long sellerId = Long.valueOf(((Map<String, Object>) payload.get("seller")).get("id").toString());

    // Fetch the Seller entity from the database
    Seller seller = sellerRepository.findById(sellerId)
        .orElseThrow(() -> new RuntimeException("Seller not found with ID: " + sellerId));
        // Convert the products field to a List<Product>
    ObjectMapper objectMapper = new ObjectMapper();
    List<Product> products = objectMapper.convertValue(payload.get("products"),
            objectMapper.getTypeFactory().constructCollectionType(List.class, Product.class));
    products.forEach(product -> {
        Long productId = product.getId();
        Integer productQuantity = Integer.valueOf(product.getQuantity().toString());
        
        Product existingProduct = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        if (existingProduct.getQuantity() < productQuantity) {
            throw new RuntimeException("Insufficient inventory for product: " + existingProduct.getName());
        }
        existingProduct.setQuantity(existingProduct.getQuantity() - productQuantity);
        productRepository.save(existingProduct);
    });
    // Extract other fields from the payload
    Integer visited = Integer.valueOf(payload.get("visited").toString());
    Integer deals = Integer.valueOf(payload.get("deals").toString());
    Double amount = Double.valueOf(payload.get("amount").toString());
    LocalDate date = LocalDate.parse(payload.get("date").toString());

    // Create and save the Sale entity
    Sale newSale = new Sale();
    newSale.setSeller(seller);
    newSale.setVisited(visited);
    newSale.setDeals(deals);
    newSale.setAmount(amount);
    newSale.setDate(date);

    Sale savedSale = service.saveSale(newSale);

    // Return a DTO instead of the entity
    return ResponseEntity.ok(new SaleDTO(savedSale));
}

	@GetMapping("/total")
    public ResponseEntity<Map<String, Double>> getTotalSales() {
        double totalSales = service.calculateTotalSales();
        Map<String, Double> response = new HashMap<>();
        response.put("totalSales", totalSales);
        return ResponseEntity.ok(response);
    }

	@GetMapping("/view")
	public ResponseEntity<List<SaleDTO>> getSales() {
    List<SaleDTO> sales = service.viewAll();
    return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(sales);
	}
	
	@GetMapping(value = "/amount-by-seller")
	public ResponseEntity<List<SaleSumDTO>> amountGroupedBySeller() {
		List<SaleSumDTO> list = service.amountGroupedBySeller();		
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/success-by-seller")
	public ResponseEntity<List<SaleSuccessDTO>> successGroupedBySeller() {
		List<SaleSuccessDTO> list = service.successGroupedBySeller();		
		return ResponseEntity.ok(list);
	}
 
}
