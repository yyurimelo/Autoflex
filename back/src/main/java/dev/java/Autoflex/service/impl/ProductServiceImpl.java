package dev.java.Autoflex.service.impl;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import dev.java.Autoflex.dto.queryFilter.ProductFilter;
import dev.java.Autoflex.exception.InvalidProductException;
import dev.java.Autoflex.exception.ProductNotFoundException;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.repository.ProductRepository;
import dev.java.Autoflex.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        if ((product.getName() == null || product.getName().isBlank()) || (product.getPrice() == null)) {
            throw new InvalidProductException();
        }

        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> findByFilters(ProductFilter filter, Pageable pageable) {
        return productRepository.findAll(filter.toSpecification(), pageable);
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);
    }

    @Override
    public Product update(Product product) {
        Product existing = productRepository.findById(product.getId())
                .orElseThrow(ProductNotFoundException::new);

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        // atualize só os campos que fazem sentido alterar

        return productRepository.save(existing);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.findById(id).orElseThrow(ProductNotFoundException::new);

        productRepository.deleteById(id);
    }
}
