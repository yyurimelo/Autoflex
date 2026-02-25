package dev.java.Autoflex.service;

import org.springframework.data.domain.Page;

import dev.java.Autoflex.dto.ProductRawMaterialFilterRequest;
import dev.java.Autoflex.model.ProductRawMaterial;

public interface ProductRawMaterialService {
    
    ProductRawMaterial create(ProductRawMaterial productRawMaterial);
    
    Page<ProductRawMaterial> findByFilters(ProductRawMaterialFilterRequest filterRequest);
    
    ProductRawMaterial findById(Long id);
    
    void deleteById(Long id);
}