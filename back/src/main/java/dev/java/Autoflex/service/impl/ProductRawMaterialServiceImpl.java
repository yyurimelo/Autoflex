package dev.java.Autoflex.service.impl;

import java.util.Optional;

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
        Product product = productRepository.findById(productRawMaterial.getProduct().getId())
                .orElseThrow(ProductNotFoundException::new);

        RawMaterial rawMaterial = rawMaterialRepository.findById(productRawMaterial.getRawMaterial().getId())
                .orElseThrow(RawMaterialNotFoundException::new);

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
    public ProductRawMaterial update(ProductRawMaterial productRawMaterial) {
        ProductRawMaterial existing = productRawMaterialRepository.findById(productRawMaterial.getId())
                .orElseThrow(ProductRawMaterialNotFoundException::new);

        Product product = productRepository.findById(productRawMaterial.getProduct().getId())
                .orElseThrow(ProductNotFoundException::new);

        RawMaterial rawMaterial = rawMaterialRepository.findById(productRawMaterial.getRawMaterial().getId())
                .orElseThrow(RawMaterialNotFoundException::new);

        Optional<ProductRawMaterial> existingAssociation = productRawMaterialRepository.findByProductIdAndRawMaterialId(
                product.getId(), rawMaterial.getId());

        if (existingAssociation.isPresent() && !existingAssociation.get().getId().equals(productRawMaterial.getId())) {
            throw new ProductRawMaterialAlreadyExistsException();
        }

        existing.setProduct(product);
        existing.setRawMaterial(rawMaterial);
        existing.setRequiredQuantity(productRawMaterial.getRequiredQuantity());

        return productRawMaterialRepository.save(existing);
    }

    @Override
    public void deleteById(Long id) {
        if (!productRawMaterialRepository.existsById(id)) {
            throw new ProductRawMaterialNotFoundException();
        }

        productRawMaterialRepository.deleteById(id);
    }
}