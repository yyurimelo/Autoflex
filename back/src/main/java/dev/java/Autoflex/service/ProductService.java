package dev.java.Autoflex.service;

import java.util.List;

import dev.java.Autoflex.model.Product;

public interface ProductService {
    Product save(Product product);

    List<Product> findAll();

    Product findById(Long id);

    Product update(Product product);

    void deleteById(Long id);
}
