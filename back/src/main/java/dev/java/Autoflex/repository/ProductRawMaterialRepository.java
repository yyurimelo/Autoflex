package dev.java.Autoflex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.java.Autoflex.model.ProductRawMaterial;

@Repository
public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Long> {
    
    Page<ProductRawMaterial> findAll(Pageable pageable);
    
    Optional<ProductRawMaterial> findByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);
    
    List<ProductRawMaterial> findByProductId(Long productId);
    
    
    @Query("SELECT prm FROM ProductRawMaterial prm WHERE " +
           "(:productId IS NULL OR prm.product.id = :productId) AND " +
           "(:rawMaterialId IS NULL OR prm.rawMaterial.id = :rawMaterialId) AND " +
           "(:minRequiredQuantity IS NULL OR prm.requiredQuantity >= :minRequiredQuantity) AND " +
           "(:maxRequiredQuantity IS NULL OR prm.requiredQuantity <= :maxRequiredQuantity)")
    Page<ProductRawMaterial> findByFilters(@Param("productId") Long productId,
                                         @Param("rawMaterialId") Long rawMaterialId,
                                         @Param("minRequiredQuantity") Integer minRequiredQuantity,
                                         @Param("maxRequiredQuantity") Integer maxRequiredQuantity,
                                         Pageable pageable);
}