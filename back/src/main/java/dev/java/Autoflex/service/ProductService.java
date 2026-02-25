package dev.java.Autoflex.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.java.Autoflex.dto.queryFilter.ProductFilter;
import dev.java.Autoflex.model.Product;

public interface ProductService {
    Product save(Product product);

    List<Product> findAll();

Page<Product> findAll(Pageable pageable);

    Page<Product> findByFilters(ProductFilter filter, Pageable pageable);

    Product findById(Long id);

    Product update(Product product);

    void deleteById(Long id);
}
