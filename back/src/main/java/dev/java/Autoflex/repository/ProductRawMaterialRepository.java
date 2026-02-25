package dev.java.Autoflex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import dev.java.Autoflex.model.ProductRawMaterial;

@Repository
public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Long>, JpaSpecificationExecutor<ProductRawMaterial> {
    
    Page<ProductRawMaterial> findAll(Pageable pageable);
    
    Optional<ProductRawMaterial> findByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);
    
    List<ProductRawMaterial> findByProductId(Long productId);
}