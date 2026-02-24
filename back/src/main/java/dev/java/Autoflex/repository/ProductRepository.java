package dev.java.Autoflex.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import dev.java.Autoflex.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
