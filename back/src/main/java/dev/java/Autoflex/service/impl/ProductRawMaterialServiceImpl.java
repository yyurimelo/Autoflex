package dev.java.Autoflex.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.java.Autoflex.dto.queryFilter.ProductRawMaterialFilter;
import dev.java.Autoflex.exception.ProductNotFoundException;
import dev.java.Autoflex.exception.ProductRawMaterialAlreadyExistsException;
import dev.java.Autoflex.exception.ProductRawMaterialNotFoundException;
import dev.java.Autoflex.exception.RawMaterialNotFoundException;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.model.ProductRawMaterial;
import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.repository.ProductRawMaterialRepository;
import dev.java.Autoflex.repository.ProductRepository;
import dev.java.Autoflex.repository.RawMaterialRepository;
import dev.java.Autoflex.service.ProductRawMaterialService;

@Service
public class ProductRawMaterialServiceImpl implements ProductRawMaterialService {

    private final ProductRawMaterialRepository productRawMaterialRepository;
    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;

    public ProductRawMaterialServiceImpl(
            ProductRawMaterialRepository productRawMaterialRepository,
            ProductRepository productRepository,
            RawMaterialRepository rawMaterialRepository) {
        this.productRawMaterialRepository = productRawMaterialRepository;
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
    }

    @Override
    public ProductRawMaterial create(ProductRawMaterial productRawMaterial) {
        // Validar se o produto existe
        Product product = productRepository.findById(productRawMaterial.getProduct().getId())
                .orElseThrow(ProductNotFoundException::new);
        
        // Validar se a matéria-prima existe
        RawMaterial rawMaterial = rawMaterialRepository.findById(productRawMaterial.getRawMaterial().getId())
                .orElseThrow(RawMaterialNotFoundException::new);
        
        // Verificar se a associação já existe
        if (productRawMaterialRepository.findByProductIdAndRawMaterialId(
                product.getId(), rawMaterial.getId()).isPresent()) {
            throw new ProductRawMaterialAlreadyExistsException();
        }
        
        productRawMaterial.setProduct(product);
        productRawMaterial.setRawMaterial(rawMaterial);
        
        return productRawMaterialRepository.save(productRawMaterial);
    }

    

    

    @Override
    public Page<ProductRawMaterial> findByFilters(ProductRawMaterialFilter filter, Pageable pageable) {
        
        return productRawMaterialRepository.findAll(filter.toSpecification(), pageable);
    }

    

    @Override
    public ProductRawMaterial findById(Long id) {
        return productRawMaterialRepository.findById(id)
                .orElseThrow(ProductRawMaterialNotFoundException::new);
    }

    

    @Override
    public void deleteById(Long id) {
        if (!productRawMaterialRepository.existsById(id)) {
            throw new ProductRawMaterialNotFoundException();
        }
        
        productRawMaterialRepository.deleteById(id);
    }
}