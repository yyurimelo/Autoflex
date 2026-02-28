package dev.java.Autoflex.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.java.Autoflex.dto.queryFilter.ProductRawMaterialFilter;
import dev.java.Autoflex.model.ProductRawMaterial;

public interface ProductRawMaterialService {
    
    ProductRawMaterial create(ProductRawMaterial productRawMaterial);
    
    Page<ProductRawMaterial> findByFilters(ProductRawMaterialFilter filter, Pageable pageable);
    
    ProductRawMaterial findById(Long id);
    
    ProductRawMaterial update(ProductRawMaterial productRawMaterial);
    
    void deleteById(Long id);
}